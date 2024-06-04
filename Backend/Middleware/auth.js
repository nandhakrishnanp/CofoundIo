const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  authToken = req.headers["authorization"];
  console.log(authToken);
  if (!authToken) {
    return res.status(401).json({
      msg: "Unauthorized request",
    });
  }

  const token = authToken.split(" ")[1];
  const verifyToken = jwt.verify(token, process.env.SIGN_JWT);
  if (!verifyToken) {
    return res.status(401).json({
      msg: "Unauthorized request - Invalid token",
    });
  } else {
    req.user = { userId: verifyToken.id };
  }
  console.log("token :" + verifyToken);
  next();
};

module.exports = auth;
