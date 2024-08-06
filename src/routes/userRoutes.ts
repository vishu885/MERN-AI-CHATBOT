import { Router } from "express";
import { getAllUsers, userLogin, userSignUp } from "../controllers/userController.js";
import { signUpValidator, validate } from "../utils/signUpValidator.js";
import { loginValidator } from "../utils/loginValidator.js";

const userRoutes=Router();

userRoutes.get("/",getAllUsers);
userRoutes.post("/signup",validate(signUpValidator),userSignUp);
userRoutes.post("/login",validate(loginValidator),userLogin);

export default userRoutes;