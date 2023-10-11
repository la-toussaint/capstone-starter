const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const {
  createCustomers,
  getCustomersByUsername,
} = require("../db/helpers/customers");
const { authRequired } = require("./utils");
const { JWT_SECRET } = require("../secrets");
const { sneaks_data } = require("../db/seedData");

const SALT_ROUNDS = 10;

router.get("/", async (req, res, next) => {
  try {
    res.send("WOW! A thing!");
  } catch (error) {
    next(error);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const { name, username, password, fav_brand } = req.body.customers;
    //hashing the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    //sending username and hashed pw to database
    const customers = await createCustomers({
      username,
      password: hashedPassword,
      fav_brand,
      name,
    });
    //removing password from customer object for security reasons
    delete password;

    //creating our token
    const token = jwt.sign(customers, JWT_SECRET);

    //attaching a cookie to our response using the token that we created
    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });

    delete password;

    res.send({ name, username, hashedPassword, fav_brand, token });
  } catch (error) {
    res.json({ error });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password, fav_brand, name } = req.body.customers;
    const customers = await getCustomersByUsername(username);
    const validPassword = await bcrypt.compare(password, customers.password);
    if (validPassword) {
      console.log("validPassword customers: ", customers);
      //creating our token
      const token = jwt.sign(customers, JWT_SECRET);
      console.log("token: ", token);
      //attaching a cookie to our response using the token that we created
      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });

      delete customers.password;
      console.log(
        "customers: { name, username, fav_brand, token } ",
        customers,
        name,
        username,
        fav_brand,
        token
      );
      return res.send({ customers, name, username, fav_brand, token });
    }
    res.json({ error: { message: "Invalid password" } });
  } catch (error) {
    console.log("why", error);
    res.json({ error });
  }
});

router.get("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      loggedIn: false,
      message: "Logged Out",
    });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
