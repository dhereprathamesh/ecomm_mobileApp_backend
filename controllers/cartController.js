import * as cartService from "../services/cartService.js";

export const addToCartController = async (req, res) => {
  try {
    const { userName, productCode, quantity } = req.body;
    const response = await cartService.addToCart({
      userName,
      productCode,
      quantity,
    });

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getUserCartController = async (req, res) => {
  const { userName } = req.body;
  try {
    const response = await cartService.getUserCart(userName);
    return res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
