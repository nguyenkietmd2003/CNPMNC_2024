import express from "express";
import {
  createUser,
  getFullUser,
  updateUser,
  deleteUser,
  loginUser,
  registerUser,
  forgotPassword,
  verifyCode,
  resetPassword,
  getInfo,
} from "./../controllers/UserController.js";
import { authMiddleware } from "../middlewares/auth.js";

const userRouter = express.Router();
userRouter.get("/hello", (req, res) => {
  res.send("hello world!");
});

//---------------------------------------------------------------- CRUD

userRouter.get("/getAllUser", getFullUser);
userRouter.post("/create-user", createUser);
userRouter.post("/update-user/:id", updateUser);
userRouter.post("/delete-user/:id", deleteUser);

//----------------------------------------------------------------- LOGIN/REGISTER
userRouter.post("/login-user", loginUser);
userRouter.post("/register-user", registerUser);
userRouter.post("/forgot-password-user", forgotPassword);
userRouter.post("/verify-code", verifyCode);
userRouter.post("/reset-pass", resetPassword);
userRouter.post("/get-info", getInfo);

export default userRouter;
