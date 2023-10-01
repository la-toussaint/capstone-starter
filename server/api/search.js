const express = require("express");
const router = express.Router();

// const axios = require("axios");

// const options = (query) => ({
//   url: "https://real-time-amazon-data.p.rapidapi.com/search",
//   params: {
//     query,
//     page: "1",
//     country: "US",
//     category_id: "aps",
//   },
//   headers: {
//     "X-RapidAPI-Key": "560011da9bmsh83c028acaee1b02p1ed28djsn902b2020edfc",
//     "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com",
//   },
// });

// router.get(
//   ("/search/:searchTerm",
//   async (req, res, next) => {
//     console.log("SEARCH");
//     const { term } = req.query;
//     try {
//       const response = await axios.get(options(term));
//       console.log(response.data);
//       res.json(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   })
// );
router.get(
  ("/search?term=",
  (req, res) => {
    console.log("SEARCH");
    res.send("hooray");
  })
);

module.exports = router;
