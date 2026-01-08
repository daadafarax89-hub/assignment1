import pool from "../db/conn.js";

// READ ALL
export const getAllUsersModel = (callback) => {
  pool.query("SELECT * FROM users", callback);
};

// READ ONE
export const getUserByIdModel = (id, callback) => {
  pool.query("SELECT * FROM users WHERE id = ?", [id], callback);
};

// CREATE
export const createUserModel = (data, callback) => {
  pool.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [data.username, data.password],
    callback
  );
};

// UPDATE
export const updateUserModel = (id, data, callback) => {
  pool.query(
    "UPDATE users SET username = ?, password = ? WHERE id = ?",
    [data.username, data.password, id],
    callback
  );
};

// DELETE
export const deleteUserModel = (id, callback) => {
  pool.query("DELETE FROM users WHERE id = ?", [id], callback);
};
