import * as userDao from "../dao/userDao.js";

export const getCustomers = async () => {
  return userDao.getCustomers();
};

export const updateCustomerInfo = async (id, updateData) => {
  return userDao.updateCustomerInfo(id, updateData);
};

export const searchCustomer = async (query) => {
  return userDao.searchCustomer(query);
};
