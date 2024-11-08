import {
  getAllUserService,
  createUserService,
  updateUserService,
  deleteUserService,
  loginUserService,
  registerService,
  forgotPasswordService,
  verifyCodeService,
  resetPasswordService,
  getInfoService,
} from "../services/userService.js";

export const getFullUser = async (req, res) => {
  try {
    const data = await getAllUserService();
    if (!data) return;
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (req, res) => {
  try {
    const {
      id,
      name,
      phone,
      email,
      password,
      address,
      role,
      profile,
      registeredAT,
      lastLogin,
    } = req.body;
    const user = {
      id,
      name,
      phone,
      email,
      password,
      address,
      role,
      profile,
      registeredAT,
      lastLogin,
    };
    const data = await createUserService(user);
    return res.status(201).json(data);
  } catch (error) {
    console.log(">>> check from createUser: ", error);
    if (error.message === "User already exists") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updateDatas = { id, ...req.body };

  try {
    const data = await updateUserService(updateDatas);
    return res.status(200).json(data);
  } catch (error) {
    console.log(">>> check from updateUser: " + error.message);
    if (error.message === "User not found") {
      return res.status(404).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await deleteUserService(id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    if (error.message === "User not found") {
      res.status(404).json({ message: error.message });
    } else res.status(500).json({ message: "Internal server error" });
  }
};
//////
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await loginUserService(email, password);
    return res.status(200).json({ status: 200, message: data });
  } catch (error) {
    console.log("check loginUser :", error.message);
    if (error.message === "User not found") {
      res.status(404).json({ status: 404, message: error.message });
    } else
      res.status(500).json({ status: 500, message: "Internal server error" });
  }
};
export const registerUser = async (req, res) => {
  const { name, phone, email, password } = req.body;
  const user = {
    name,
    phone,
    email,
    password,
  };
  try {
    const data = await registerService(user);
    return res.status(200).json({ status: 200, message: data });
  } catch (error) {
    console.log("check registerUser: ", error.message);
    if (error.message === "Couldn't create User") {
      return res.status(400).json({ status: 404, message: error.message });
    } else {
      return res
        .status(500)
        .json({ status: 500, message: "Internal server error" });
    }
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const data = await forgotPasswordService(email);
    return res.status(200).json({ status: 200, data: data });
  } catch (error) {
    console.log(">>> check forgotPassword : " + error.message);
    if (error.message === "Password sent to email successfully") {
      return res.status(400).json({ message: error.message });
    } else return res.status(500).json({ message: "Internal server error" });
  }
};
export const verifyCode = async (req, res) => {
  const { email, code } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email not found" });
  }
  try {
    const data = await verifyCodeService(email, code);
    res.status(200).json({ status: 200, data: data });
  } catch (error) {
    console.log(">>> check verifyCode : " + error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await resetPasswordService(email, password);
    return res.status(200).json({ data: data, status: 200 });
  } catch (error) {
    console.log(">>>check resetPassword : " + error.message);
    if (error.message === "Password updated successfully") {
      return res.status(400).json({ message: error.message });
    } else return res.status(500).json({ message: "Internal server error" });
  }
};
export const getInfo = async (req, res) => {
  const { id } = req.body;
  try {
    const data = await getInfoService(id);
    return res.status(200).json({ data: data, status: 200 });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
