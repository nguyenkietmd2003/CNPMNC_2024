import { sequelize } from "../config/database.js";
import initModels from "../models/init-models.js";
import crypto from "crypto";
import VerificationCodes from "../models/VerificationCodes.js";
import { sendEmailService } from "./sendEmailService.js";
import jwt from "jsonwebtoken";
import { createToken } from "../config/jwt.js";
// call database getAllUser

//------------------------------------------ setup to call Sequelize

let model = initModels(sequelize);

//------------------------------------------
export const getAllUserService = async () => {
  try {
    const data = model.User.findAll();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createUserService = async (data) => {
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
  } = data;

  try {
    const newUser = await model.User.create({
      id_user: id,
      name,
      phone,
      email,
      password,
      address,
      role,
      profile,
      registeredAT,
      lastLogin,
    });
    return newUser;
  } catch (error) {
    throw error;
  }
};

export const updateUserService = async (data) => {
  /// lấy id và updateUser của data
  const { id, ...updateUsers } = data;
  try {
    // cập nhập người dùng theo id

    const update = await model.User.update(
      updateUsers,

      {
        where: { id_user: id },
      }
    );
    if (!update) throw new Error("User not found");
    return await model.User.findOne({
      where: { id_user: id },
    });
  } catch (error) {
    throw error;
  }
};

export const deleteUserService = async (id) => {
  try {
    const deleteUser = await model.User.update(
      { is_delete: true },
      { where: { id_user: id } }
    );
    if (!deleteUser) throw new Error("Cannot delete user");
    const deleteCart = await model.Cart.update(
      { is_delete: true },
      { where: { id_user: id } }
    );
    if (!deleteCart) throw new Error("Cannot delete deleteCart");
    const deleteTransaction = await model.Transaction.update(
      { is_delete: true },
      { where: { id_user: id } }
    );
    if (!deleteTransaction) throw new Error("Cannot delete transaction");
    const deleteVerification = await model.VerificationCodes.update(
      { is_delete: true },
      { where: { id_user: id } }
    );
    if (!deleteVerification) throw new Error("Cannot delete Verification");
    const deleteOrder = await model.Order.update(
      { is_delete: true },
      { where: { id_user: id } }
    );
    if (!deleteOrder) throw new Error("Cannot delete Order");
    return { message: "User deleted successfully" };
  } catch (error) {
    throw error;
  }
};

///
export const loginUserService = async (email, password) => {
  try {
    const user = await model.User.findOne({
      where: { email: email },
    });
    if (!user) throw new Error("User not found");
    if (user.password === password) {
      const payload = {
        id: user.id_user,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      };
      const access_token = await createToken(payload);
      return {
        message: "login user successfully",
        access_token,
        data: payload,
      };
    } else {
      throw new Error("Incorrect password");
    }
  } catch (error) {
    throw error;
  }
};
export const registerService = async (data) => {
  const { name, phone, email, password } = data;
  //
  let existingUser;
  let hexID;

  do {
    hexID = crypto.randomInt(1000, 9999);
    existingUser = await model.User.findOne({ where: { id_user: hexID } });
  } while (existingUser);

  //

  const newUser = {
    id_user: hexID,
    name,
    phone,
    email,
    password,
    address: null,
    role: "user",
    profile: null,
    registeredAT: null,
    lastLogin: null,
  };
  try {
    const result = await model.User.create(newUser);
    if (!result) throw Error("Couldn't create User");
    else {
      let hexCart;
      let existingCart;
      do {
        hexCart = crypto.randomInt(1000, 9999);
        existingCart = await model.Cart.findOne({
          where: { id_cart: hexCart },
        });
      } while (existingCart);
      await model.Cart.create({
        id_cart: hexCart,
        id_user: newUser.id_user,
      });
      return { message: "Create User successfully" };
    }
  } catch (error) {
    throw error;
  }
};

export const forgotPasswordService = async (email) => {
  try {
    const user = await model.User.findOne({
      where: { email },
    });
    if (!user) throw Error("Couldn't find User ");
    //
    const verificationCode = crypto.randomInt(100000, 999999).toString();
    const expirationTime = Date.now() + 15 * 60 * 1000;
    await VerificationCodes.create({
      id_user: user.id_user,
      code: verificationCode,
      expires_at: expirationTime,
    });
    await sendEmailService(email, verificationCode);
    return { message: "Password sent to email successfully" };
  } catch (error) {
    throw error;
  }
};
export const verifyCodeService = async (email, code) => {
  try {
    const user = await model.User.findOne({
      where: { email },
    });
    if (!user) throw Error("Couldn't find User ");
    const verifiCodeEmail = await model.VerificationCodes.findOne({
      where: { id_user: user.id_user, code: code },
    });
    if (!verifiCodeEmail) throw Error("Verification code is incorrect");
    if (verifiCodeEmail.expires_at < Date.now())
      throw Error("Verification code expired");
    return {
      message: "Verification successful, you may now reset your password",
    };
  } catch (error) {
    console.log("check verifyservice ", error);
    throw error;
  }
};
export const resetPasswordService = async (email, password) => {
  try {
    const user = await model.User.findOne({
      where: { email },
    });
    if (!user) throw Error("Couldn't find User ");
    await user.update({
      password,
    });
    await model.VerificationCodes.destroy({ where: { id_user: user.id_user } });
    return { message: "Password reset successfully" };
  } catch (error) {
    throw error;
  }
};
export const getInfoService = async (id) => {
  try {
    const data = await model.User.findOne({
      where: { id_user: id },
    });
    if (data) return data;
    return { message: "User not found" };
  } catch (error) {
    throw error;
  }
};
