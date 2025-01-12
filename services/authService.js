import * as authDao from "../dao/authDao.js";

export const signIn = async (userData) => {
  return authDao.verifyCredentials(userData);
};

export const signUp = async (userData) => {
  return authDao.createUser(userData);
};

export const verifyOtp = async ({ userName, otp }) => {
  return authDao.verifyOTP({ userName, otp });
};

export const resendOtp = async ({ userId }) => {
  return authDao.resendOTP(userId);
};
