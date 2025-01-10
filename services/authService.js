import * as authDao from "../dao/authDao.js";

export const signIn = async (userData) => {
  return authDao.verifyCredentials(userData);
};

export const signUp = async (userData) => {
  return authDao.createUser(userData);
};

export const verifyOtp = async ({ userId, otp }) => {
  return authDao.verifyOTP({ userId, otp });
};

export const resendOtp = async ({ userId }) => {
  return authDao.resendOTP(userId);
};
