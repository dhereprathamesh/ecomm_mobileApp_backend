import * as userRoleService from "../services/userRoleService.js";

export const createUserRoleController = async (req, res) => {
  try {
    const { userName, roleDescription } = req.body;
    const response = await userRoleService.createUserRole(
      userName,
      roleDescription
    );
    return res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUserRolesController = async (req, res) => {
  try {
    const response = await userRoleService.getAllUserRoles();
    return res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
