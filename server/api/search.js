const express = require("express");
const router = express.Router();

const axios = require("axios");

const options = (query) => ({
  url: "https://real-time-amazon-data.p.rapidapi.com/search",
  params: {
    query,
    country: "US",
  },
  headers: {
    "X-RapidAPI-Key": "560011da9bmsh83c028acaee1b02p1ed28djsn902b2020edfc",
    "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com",
  },
});

router.get(
  "/search",
  async (req, res, next) => {
    const { q } = req.query
    try {
      const response = await axios.request(options(q));
      res.json(response.data);
    } catch (error) {
      console.error(error);
    }
  })

// router.get('/search', (req, res) => {
//   res.send('searching')
// });

module.exports = router;
