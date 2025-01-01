import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import { User } from "../models/userModal.js";
import { generateOTP } from "../utlis/generateOTP.js";
import nodemailer from "nodemailer";
import JWT from "jsonwebtoken";

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

    // Respond with success
    // return res.status(200).send({
    //   success: true,
    //   message: "Login successful.",
    //   user: {
    //     id: user._id,
    //     name: user.name,
    //     email: user.email,
    //     mobileNo: user.mobileNo,
    //     address: user.address,
    //     role: user.role,
    //   },
    //   token,
    // });
    return {
      status: 201,
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

// export const createUser = async (userData) => {
//   //validation
//   if (!userData.name) {
//     return res.send({ message: "Name is Required" });
//   }
//   if (!userData.email) {
//     return res.send({ message: "Email is Required" });
//   }
//   if (!userData.password) {
//     return res.send({ message: "Password is Required" });
//   }

//   //check user
//   const existingUser = await User.findOne({ email: userData.email });

//   //existing user
//   if (existingUser) {
//     return {
//       success: false,
//       message: "already Register Please login",
//     };
//   }

//   const otp = generateOTP();
//   const otpExpires = Date.now() + 10 * 60 * 1000;

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//     tls: {
//       rejectUnauthorized: false, // Ignore certificate errors
//     },
//   });

//   // Send the OTP email
//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "Your OTP Code",
//     text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
//   });

//   //register user
//   //   const hashedPassword = await hashPassword(password);
//   //   console.log("Hashed password:", hashedPassword);

//   //save
//   const user = await new User({
//     userName: userData.userName,
//     name: userData.name,
//     email: userData.email,
//     mobileNo: userData.mobileNo,
//     password: userData.password,
//   }).save();
//   return {
//     message: "User Register Successffully",
//     user,
//   };
// };

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
      password: hashedPassword, // Replace with `hashedPassword` after hashing
      otp,
      otpExpires,
    }).save();

    return {
      status: 201,
      data: {
        success: true,
        message: "User registered successfully. Please verify your OTP.",
        user,
      },
    };
  } catch (error) {
    console.error("Error in createUser:", error);
    throw new Error("Service error during user registration");
  }
};

export const verifyOTP = async ({ email, otp }) => {
  if (!email || !otp) {
    return {
      status: 400,
      data: { message: "Email and OTP are required" },
    };
  }
  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return {
        status: 404,
        data: { message: "User not found" },
      };
    }

    // Check if OTP matches and is not expired
    if (user.otp !== otp) {
      return {
        status: 400,
        data: { message: "Invalid OTP" },
      };
    }

    if (user.otpExpires < Date.now()) {
      return {
        status: 400,
        data: { message: "OTP has expired" },
      };
    }

    // Activate the user (or mark as verified)
    user.otp = undefined; // Remove OTP
    user.otpExpires = undefined; // Remove OTP expiration
    user.isVerified = true; // Mark as verified
    await user.save();

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
