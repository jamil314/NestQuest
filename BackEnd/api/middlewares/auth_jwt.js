const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const { bearertoken } = req.headers;
    const decodedToken = jwt.verify(bearertoken, process.env.JWT_KEY);
    const userId = decodedToken.userId;
    // console.log("decoded",userId);
    if (!userId) {
      return res.status(401).json({ message: "You are not authorized!" });
    }
    req.userId = userId;
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "You are not authorized!" });
  }
  next();
};
