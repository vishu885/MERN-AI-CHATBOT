import { Router } from "express";
import { getAllUsers } from "../controllers/userController.js";
const userRoutes = Router();
userRoutes.get("/", getAllUsers);
export default userRoutes;
//# sourceMappingURL=userRoutes.js.map