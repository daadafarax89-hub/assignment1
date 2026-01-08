import express from "express";
import { createUser, getAllUsers, getUserById, login } from "../controller/userController.js";

const router = express.Router();

router.post("/muser", createUser);
router.get("/musers", getAllUsers);
router.get("/muser/:id", getUserById);
router.post("/mlogin", login);

export default router;
