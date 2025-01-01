import * as authService from "../services/authService.js";

export const signIn = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const response = await authService.signIn({ userName, password });
    return res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const signUp = async (req, res) => {
  const { userName, password, email, name, mobileNo } = req.body;
  try {
    const response = await authService.signUp({
      userName,
      password,
      email,
      name,
      mobileNo,
    });

    return res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const response = await authService.verifyOtp({
      email,
      otp,
    });

    return res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
