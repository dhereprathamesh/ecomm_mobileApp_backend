import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import { User } from "../models/userModal.js";
import { OTP } from "../models/otpModal.js";
import { generateOTP } from "../utlis/generateOTP.js";
import nodemailer from "nodemailer";
import JWT from "jsonwebtoken";
import mongoose from "mongoose";

export const verifyCredentials = async (userData, res) => {
  try {
    // const { userName, password } = req.body;

    // Validation
    if (!userData.userName || !userData.password) {
      return {
        status: 400,
        data: {
          success: false,
          message: "Username and password are required.",
        },
      };
    }

    // Check if the user exists
    const user = await User.findOne({ userName: userData.userName });
    if (!user) {
      return {
        status: 404,
        data: {
          success: false,
          message: "User not found. Please register first.",
        },
      };
    }

    // Compare passwords
    const isMatch = await comparePassword(userData.password, user.password);
    if (!isMatch) {
      return {
        status: 401,
        data: {
          success: false,
          message: "Invalid password.",
        },
      };
    }

    // Generate token
    const token = JWT.sign(
      { _id: user._id }, // Payload
      process.env.JWT_SECRET, // Secret
      { expiresIn: "7d" } // Token expiry
    );

    return {
      status: 200,
      data: {
        success: true,
        message: "Login successful.",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          mobileNo: user.mobileNo,
          address: user.address,
          role: user.role,
        },
        token,
      },
    };
  } catch (error) {
    console.error("Error in LoginUser:", error);
    throw new Error("Service error during user registration");
  }
};

export const createUser = async (userData, res) => {
  try {
    // Validation
    if (!userData.name) {
      return { status: 400, data: { message: "Name is required" } };
    }
    if (!userData.email) {
      return { status: 400, data: { message: "email is required" } };
    }
    if (!userData.password) {
      return { status: 400, data: { message: "password is required" } };
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      return {
        status: 400,
        data: { message: "Already registered. Please log in." },
      };
    }

    // Generate OTP and expiry
    const otp = generateOTP();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes from now

    // Configure the email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Ignore certificate errors
      },
    });

    // Send the OTP email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userData.email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
    });

    // Hash the password (placeholder for actual hashing logic)
    const hashedPassword = await hashPassword(userData.password);

    // Save the user
    const user = await new User({
      userName: userData.userName,
      name: userData.name,
      email: userData.email,
      mobileNo: userData.mobileNo,
      password: hashedPassword,
    }).save();

    const otpModal = await new OTP({
      user: user._id,
      expiryDate: otpExpires,
      otpCode: otp,
      mobileNumber: userData.mobileNo,
      email: userData.email,
      // valid: { type: Boolean, default: true },
    }).save();

    return {
      status: 200,
      data: {
        success: true,
        message: "User registered successfully. Please verify your OTP.",
        user,
        otpModal,
      },
    };
  } catch (error) {
    console.error("Error in createUser:", error);
    throw new Error("Service error during user registration");
  }
};

export const verifyOTP = async ({ otp, userId }) => {
  if (!otp || !userId) {
    return {
      status: 400,
      data: { message: "OTP and User ID are required" },
    };
  }
  try {
    // Find the user by email
    const otpRecord = await OTP.findOne({ user: userId });

    if (!otpRecord) {
      return {
        status: 404,
        data: { message: "OTP record not found" },
      };
    }

    // Check if OTP matches and is not expired
    if (otpRecord.otpCode !== otp) {
      return {
        status: 400,
        data: { message: "Invalid OTP" },
      };
    }

    if (otpRecord.expiryDate < Date.now()) {
      return {
        status: 400,
        data: { message: "OTP has expired" },
      };
    }

    otpRecord.valid = true; // Mark OTP as verified
    // otpRecord.otpCode = undefined; // Remove OTP
    // otpRecord.expiryDate = undefined; // Remove OTP expiration
    await otpRecord.save();

    return {
      status: 200,
      data: {
        success: true,
        message: "OTP verified successfully. Account activated!",
      },
    };
  } catch (error) {
    console.error("Error in verifyOTP:", error);
    throw new Error("Service error during OTP verification");
  }
};

// New Resend OTP Function
export const resendOTP = async (userId) => {
  if (!userId) {
    return {
      status: 400,
      data: { message: "User ID is required" },
    };
  }

  try {
    // Validate and convert userId to ObjectId
    const validUserId = new mongoose.Types.ObjectId(userId);

    // Find the user
    const user = await User.findById(validUserId);
    if (!user) {
      return {
        status: 404,
        data: { message: "User not found" },
      };
    }

    // Find the OTP record
    const otpRecord = await OTP.findOne({ user: validUserId });

    if (!otpRecord) {
      return {
        status: 404,
        data: { message: "OTP record not found" },
      };
    }

    // Check if OTP has expired
    let otp, otpExpires;
    if (otpRecord.expiryDate < Date.now()) {
      // OTP expired, generate a new one
      otp = generateOTP();
      otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes from now
      otpRecord.otpCode = otp;
      otpRecord.expiryDate = otpExpires;
      otpRecord.valid = false; // Mark as not verified
    } else {
      otp = otpRecord.otpCode;
      otpExpires = otpRecord.expiryDate;
    }

    // Configure the email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Send the OTP email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email, // Use the email from the User table
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
    });

    // Save the OTP record (if updated)
    await otpRecord.save();

    return {
      status: 200,
      data: {
        success: true,
        message: "OTP resent successfully.",
        otp,
        otpExpires,
      },
    };
  } catch (error) {
    console.error("Error in resendOTP:", error);
    throw new Error("Service error during OTP resend");
  }
};
