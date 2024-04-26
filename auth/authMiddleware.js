const fs = require("fs");
const path = require("path");

// const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
const loadUsers = () => {
  try {
    const usersFilePath = path.join(__dirname, "users.json");
    const usersData = fs.readFileSync("users.json");
    return JSON.parse(usersData);
  } catch (error) {
    console.error("Error reading users data:", error);
    return [];
  }
};

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const [authType, credentials] = authHeader.split(" ");

  if (authType !== "Basic") {
    return res.status(401).json({ message: "Invalid authentication type" });
  }

  const [username, password] = Buffer.from(credentials, "base64")
    .toString()
    .split(":");

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  req.user = user;
  next();
};

module.exports = authMiddleware;
