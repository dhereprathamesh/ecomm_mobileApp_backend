import * as userRoleDao from "../dao/userRoleDao.js";

export const createUserRole = async (userName, roleDescription) => {
  return userRoleDao.createUserRole(userName, roleDescription);
};

export const getAllUserRoles = async () => {
  return userRoleDao.getAllUserRoles();
};
