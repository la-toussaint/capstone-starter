const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const {
  createCustomers,
  getCustomersByCustomername,
} = require("./db/helpers/customers");
const { authRequired } = require("./server/api/utils");
const { JWT_SECRET } = require("./server/secrets");

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
    const { customername, password, fav_brand, name } = req.body.customers;
    //hashing the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    //sending customername and hashed pw to database
    const customers = await createCustomers({
      customername,
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

    delete customer.password;

    res.send({ customers, fav_brand, name, token });
  } catch (error) {
    res.json({ error });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { customername, password, fav_brand, name } = req.body.customers;
    const customers = await getCustomersByCustomername(customername);
    const validPassword = await bcrypt.compare(password, customers.password);
    console.log("validPassword: ", validPassword);
    if (validPassword) {
      //creating our token
      const token = jwt.sign(customers, JWT_SECRET);

      //attaching a cookie to our response using the token that we created
      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });

      delete customers.password;
      console.log(
        "customers, fav_brand, name, token: ",
        customers,
        fav_brand,
        name,
        token
      );
      return res.send({ customers, fav_brand, name, token });
    }
    res.json({ error: { message: "Invalid password" } });
  } catch (error) {
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
router.post("/test", authRequired);

module.exports = router;
