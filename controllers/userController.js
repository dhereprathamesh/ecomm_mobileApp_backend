import * as userService from "../services/userService.js";

export const getCustomersController = async (req, res) => {
  try {
    const response = await userService.getCustomers();
    return res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCustomerInfoController = async (req, res) => {
  try {
    const { id, ...updateData } = req.body;
    const response = await userService.updateCustomerInfo(id, updateData);
    return res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchCustomerController = async (req, res) => {
  try {
    const { query } = req.query;
    const response = await userService.searchCustomer(query);
    return res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
