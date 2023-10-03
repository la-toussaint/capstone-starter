const express = require("express");
const router = express.Router();

// GET /api/health
router.get("/store", (req, res, next) => {
  res.send("OK");
  res.render("index", { title: "Express" });
});

router.use("/search", require("./search"));

// router.use("/auth", require("./auth"));

// router.use("/sneaks_data", require("./sneaks_data"));

// router.use("/customers", require("./customers"));

// => /pokedata/**  =>  pokedata => /pokedata// export all your helpers from here
// individual helper files should have sql in them to interact with db
module.exports = router;
