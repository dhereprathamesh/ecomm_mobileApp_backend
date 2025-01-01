import * as authDao from "../dao/authDao.js";

export const signIn = async (userData) => {
  return authDao.verifyCredentials(userData);
};

export const signUp = async (userData) => {
  return authDao.createUser(userData);
};

export const verifyOtp = async ({ email, otp }) => {
  return authDao.verifyOTP({ email, otp });
};
