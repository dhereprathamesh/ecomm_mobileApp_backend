import { User } from "../models/userModal.js";

export const getCustomers = async () => {
  try {
    const users = await User.find().select("-password");

    if (!users) {
      return {
        status: 404,
        data: {
          success: false,
          message: "user not found",
        },
      };
    }

    return {
      status: 200,
      data: {
        message: "customer found successfully",
        users,
      },
    };
  } catch (error) {
    console.log("customer error", error);
    return {
      status: 500,
      data: {
        message: "Error fetchning customer",
        error: error.message,
      },
    };
  }
};
export const updateCustomerInfo = async (id, updateData) => {
  try {
    if (updateData.password) {
      return {
        status: 400,
        data: {
          success: false,
          message: "Password update is not allowed via this endpoint",
        },
      };
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return {
        status: 404,
        data: {
          success: false,
          message: "Customer not found",
        },
      };
    }

    return {
      status: 200,
      data: {
        success: true,
        message: "Customer updated successfully",
        updatedUser,
      },
    };
  } catch (error) {
    console.log("customer error", error);
    return {
      status: 500,
      data: {
        message: "Error on updating customer info",
        error: error.message,
      },
    };
  }
};

export const searchCustomer = async ({ query }) => {
  try {
    const users = await User.find({
      $or: [
        { name: new RegExp(query, "i") },
        { userName: new RegExp(query, "i") },
        { email: new RegExp(query, "i") },
      ],
    }).select("-password");

    if (!users.length) {
      return {
        status: 404,
        data: {
          success: false,
          message: "No users found matching the query",
        },
      };
    }

    return {
      status: 200,
      data: {
        message: "customer found successfully",
        users,
      },
    };
  } catch (error) {
    console.log("customer error", error);
    return {
      status: 500,
      data: {
        message: "Error fetchning customer",
        error: error.message,
      },
    };
  }
};
