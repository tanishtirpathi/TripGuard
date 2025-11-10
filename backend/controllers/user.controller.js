// controllers/user.controller.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import { Apierror } from "../utils/APIerror.js";
import { APIresp } from "../utils/apiresp.js";
import { sendmail, EmailVerificationMailGenContent } from "../utils/mail.js";

const generateAccessAndRefreshTokens = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Apierror(404, "User not found");

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

//! ---------------------- SIGNUP ----------------------
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, password: hashed });

    const accessToken = newUser.generateAccessToken();
    const refreshToken = newUser.generateRefreshToken();
    newUser.refreshToken = refreshToken;

    const { hashedToken, unhashedToken, tokenExpiry } =
      newUser.generateEmailVerificationToken();
    newUser.emailVerificationToken = hashedToken;
    newUser.emailVerificationTokenExpiry = new Date(tokenExpiry);
    await newUser.save();
    console.log("✅ Saved user with verification token:", newUser.emailVerificationToken);

    const verificationUrl = `https://tripguard.vercel.app/verify/${unhashedToken}`;
    const mailContent = EmailVerificationMailGenContent(name, verificationUrl);

    console.log("sending email to:", newUser.email);
    // sendmail now throws on error so wrap in try/catch or let it bubble
    const sendingInfo = await sendmail({
      email: newUser.email,
      subject: "Verify your Tasker account",
      mailGenContent: mailContent,
    });

    // success response
    return res
      .status(200)
      .json(
        new APIresp(
          200,
          { newUser: { id: newUser._id, name: newUser.name, email: newUser.email }, accessToken, refreshToken },
          "Verification email sent"
        )
      );
  } catch (err) {
    console.error("Signup error:", err);
    const status = err?.statusCode || 500;
    const message = err?.message || "Server error";
    return res.status(status).json({ message });
  }
};

//! ---------------------- LOGIN ----------------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Invalid credentials" });

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    // set cookies - DO NOT force secure in dev
    const isProd = process.env.NODE_ENV === "production";

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    const status = err?.statusCode || 500;
    const message = err?.message || "Server error";
    return res.status(status).json({ message });
  }
};

// !---------------------- LOGOUT ----------------------
export const logoutUser = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (userId) {
      await User.findByIdAndUpdate(userId, { $unset: { refreshToken: 1 } });
    }

    const isProd = process.env.NODE_ENV === "production";

    // Use same cookie options used to set the cookie so clearCookie works
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: isProd ? "none" : "lax",
      secure: isProd,
      path: "/",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: isProd ? "none" : "lax",
      secure: isProd,
      path: "/",
    });

    return res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// !---------------------- VERIFY EMAIL ----------------------
export const verify = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) return res.status(400).json({ message: "Verification token missing" });

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpiry = undefined;
    await user.save();

    console.log("User verified successfully ", user._id);
    return res.status(200).json({ status: true });
  } catch (err) {
    console.error("Verify error:", err);
    const status = err?.statusCode || 500;
    const message = err?.message || "Token verification failed";
    return res.status(status).json({ message });
  }
};

// !---------------------- DASHBOARD (PROTECTED) ----------------------
export const dashboard = (req, res) => {
  return res.json({
    message: `Welcome ${req.user.name || req.user.email}`,
    user: req.user,
  });
};
