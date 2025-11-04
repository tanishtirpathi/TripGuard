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

// ---------------------- SIGNUP ----------------------
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
    newUser.emailVerificationTokenExpiry = tokenExpiry;
    await newUser.save();
    console.log(
      "✅ Saved user with verification token:",
      newUser.emailVerificationToken
    );

    const verificationUrl = `https://tripguard.vercel.app/verify/${unhashedToken}`;
    if (!verificationUrl) {
      throw new Apierror(400, "error in verificationUrl");
    }
    console.log("step one is done ", verificationUrl);
    const mailContent = EmailVerificationMailGenContent(name, verificationUrl);
    if (!mailContent) {
      throw new Apierror(400, "error in mailContent");
    }

    console.log("step two is done ", mailContent);

    console.log("sending email to:", newUser.email);
    await sendmail({
      email: newUser.email,
      subject: "Verify your Tasker account",
      mailGenContent: mailContent,
    });
    console.log("email sent successfully!");
    return res
      .status(200)
      .json(
        new APIresp(
          200,
          { newUser, accessToken, refreshToken },
          "Verification email sent"
        )
      );
  } catch (err) {
    console.error("Signup error:", err.message, err.stack);

    return res.status(500).json({ message: "Server error" });
  }
};

// ---------------------- LOGIN ----------------------
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new Apierror(400, "Email and password are required");

  const user = await User.findOne({ email });
  if (!user) throw new Apierror(404, "User not found");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Apierror(401, "Invalid credentials");

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

  // ✅ Set cookies
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // ✅ No need to send token in body
  return res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
  });
};


// ---------------------- LOGOUT ----------------------

export const logoutUser = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (userId) {
      await User.findByIdAndUpdate(userId, { $unset: { refreshToken: 1 } });
    }

    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production" ? true : false,
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production" ? true : false,
    });

    return res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ---------------------- VERIFY EMAIL ----------------------
export const verify = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) throw new Apierror(400, "Verification token missing");

    //console.log("Incoming token from URL:", token);
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    //console.log("Hashed token computed:", hashedToken);

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationTokenExpiry: { $gt: Date.now() },
    });

    // console.log(`this is the uer we are getting right now ${user}`);
    if (!user) {
      console.log(user, hashedToken);
      console.log("No matching user found for:", hashedToken);
      throw new Apierror(400, "Invalid or expired token");
    }
    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpiry = undefined;
    await user.save();
    console.log("User verified successfully ", user);
    return res.status(200).json({ status: true });
  } catch (error) {
    throw new Apierror(400, "error in token verification ");
  }
};

// ---------------------- DASHBOARD (PROTECTED) ----------------------
export const dashboard = (req, res) => {
  return res.json({
    message: `Welcome ${req.user.name || req.user.email}`,
    user: req.user,
  });
};
