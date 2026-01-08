export const authMiddleware = (req, res, next) => {
  const data = req.body;

  if (data?.username === "asad") {
    return res.status(403).json({ error: "Forbidden: Access is denied" });
  }

  console.log("Auth middleware executed");
  next();
};
