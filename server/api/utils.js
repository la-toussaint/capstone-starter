const client = require("../db/client");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets");

const authRequired = (req, res, next) => {
  console.log(req.headers);
  const token = req.headers.authorization;
  const validJWT = Boolean(jwt.verify(token, JWT_SECRET));

  console.log("Cookie Token:", token);
  try {
    if (validJWT) {
      res.json({ authorized: true });
    }
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: "You are def not authorized.",
    });
    return;
  }
};