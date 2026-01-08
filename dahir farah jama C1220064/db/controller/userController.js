import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function createUser(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Missing required fields: name, email, password",
      });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: String(password),
      role,
    });

    return res.status(201).json({ message: "User created", user });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await User.find({}, "name email role");
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

export async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id, "name email role");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email?.toLowerCase() });
    if (!user) return res.status(401).json({ message: "Invalid Email" });

    const isMatch = await bcrypt.compare(String(password), user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({ success: true, token });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}
