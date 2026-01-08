import {
  getAllUsersModel,
  getUserByIdModel,
  createUserModel,
  updateUserModel,
  deleteUserModel,
} from "../model/user.model.js";

// GET ALL
export const getAllUsers = (req, res) => {
  getAllUsersModel((err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.status(200).json(results);
  });
};

// GET BY ID
export const getUserById = (req, res) => {
  getUserByIdModel(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json(results[0]);
  });
};

// CREATE
export const createUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "username and password required" });

  createUserModel(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: "Insert failed" });

    res.status(201).json({
      message: "User created",
      id: result.insertId,
    });
  });
};

// UPDATE
export const updateUser = (req, res) => {
  updateUserModel(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: "Update failed" });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated" });
  });
};

// DELETE
export const deleteUser = (req, res) => {
  deleteUserModel(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: "Delete failed" });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });

    res.status(204).send();
  });
};
