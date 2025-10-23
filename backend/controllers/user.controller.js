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
    await newUser.save();
    const accessToken = newUser.generateAccessToken();
    const refreshToken = newUser.generateRefreshToken();
    newUser.refreshToken = refreshToken;

    const { hashedToken, unhashedToken, tokenExpiry } =
      newUser.generateEmailVerificationToken();

    newUser.emailVerificationToken = hashedToken;
    newUser.emailVerificationTokenExpiry = tokenExpiry;
    const verificationUrl = `http://localhost:5000/api/auth/verify/${unhashedToken}`;
    if (!verificationUrl) {
      throw new Apierror(400, "error in verificationUrl");
    }
    console.log("step one is done ", verificationUrl);
    const mailContent = EmailVerificationMailGenContent(name, verificationUrl);
    if (!mailContent) {
      throw new Apierror(400, "error in mailContent");
    }
    console.log("step two is done ", mailContent);

    // Send email
    await sendmail({
      email: newUser.email,
      subject: "Verify your Tasker account",
      mailGenContent: mailContent,
    });
    await newUser.save();
    return res.json(
      new APIresp(
        200,
        { newUser, accessToken, refreshToken, hashedToken },
        "Email verified successfully"
      )
    );
  } catch (err) {
    console.error("Signup error:", err);
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

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new APIresp(
        200,
        {
          user: { id: user._id, name: user.name, email: user.email },
          accessToken,
        },
        "Login successful"
      )
    );
};

// ---------------------- LOGOUT ----------------------
export const logoutUser = async (req, res) => {
  if (!req.user || !req.user._id)
    return res.status(401).json({ message: "Unauthorized" });

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );

  if (!user) return res.status(404).json({ message: "User not found" });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json({ message: "User logged out successfully" });
};

// ---------------------- VERIFY EMAIL ----------------------
export const verify = async (req, res) => {
  const { token } = req.params;
  if (!token) throw new Apierror(400, "Verification token missing");

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationTokenExpiry: { $gt: Date.now() },
  });

  if (!user) throw new Apierror(400, "Invalid or expired token");

  user.emailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationTokenExpiry = undefined;
  await user.save();

  return res
    .status(200)
    .json(new APIresp(200, {}, "Email verified successfully"));
};

// ---------------------- DASHBOARD (PROTECTED) ----------------------
export const dashboard = (req, res) => {
  return res.json({
    message: `Welcome ${req.user.name || req.user.email}`,
    user: req.user,
  });
};
