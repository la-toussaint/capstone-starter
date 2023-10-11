const express = require("express");
const router = express.Router();

// GET /api/health
router.get("/store", (req, res, next) => {
  res.send("OK");
  res.render("index", { title: "Express" });
});

router.use("/search", require("./search"));

router.use("/auth", require("./auth"));

router.use("/sneaks_data", require("./sneaks_data"));

router.use("/customers", require("./customers"));

router.use("/me", require("./customers"));

router.use("/closets", require("./closets"));

module.exports = router;
