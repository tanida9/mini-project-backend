import express from "express";
import { userControllers } from "./controllers/usersController.js";

const router = express.Router();

router.get("/users", userControllers.getAllUsers);
router.post("/users", userControllers.createUser);

export default router;