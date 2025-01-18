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

// Update cart
export const updateCartController = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { userName, productCode, quantity } = req.body;
    const response = await cartService.updateCart({
      cartId,
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

// Clear cart controller
export const clearCartController = async (req, res) => {
  try {
    const { cartId } = req.params;

    const response = await cartService.clearCart(cartId);
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Remove cart entry
export const removeCartEntryController = async (req, res) => {
  try {
    const { cartEntryId } = req.params;

    const result = await cartService.removeCartEntry(cartEntryId);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
