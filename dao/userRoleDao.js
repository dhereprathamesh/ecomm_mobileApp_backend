import { User } from "../models/userModal.js";
import { UserRole } from "../models/userRole.js";

export const createUserRole = async (userName, roleDescription) => {
  try {
    // Validate inputs
    if (!userName || !roleDescription) {
      return {
        status: 400,
        data: {
          success: false,
          message: "UserName and roleDescription are required",
        },
      };
    }

    // Find the user by userName
    const user = await User.findOne({ userName });
    if (!user) {
      return {
        status: 404,
        data: {
          success: false,
          message: "User not found",
        },
      };
    }

    // Create a new UserRole using the user's ObjectId
    const newUserRole = new UserRole({ user: user._id, roleDescription });

    const savedRole = await newUserRole.save();

    return {
      status: 200,
      data: {
        success: true,
        message: "User role created successfully",
        data: savedRole,
      },
    };
  } catch (error) {
    return {
      status: 500,
      data: {
        success: false,
        message: "Error creating user role",
        error: error.message,
      },
    };
  }
};

export const getAllUserRoles = async () => {
  try {
    const roles = await UserRole.find().populate("user", "name userName email");

    return {
      status: 200,
      data: {
        success: true,
        data: roles,
      },
    };
  } catch (error) {
    return {
      status: 500,
      data: {
        success: false,
        message: "Error fetching user roles",
        error: error.message,
      },
    };
  }
};
