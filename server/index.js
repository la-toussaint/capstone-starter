const express = require("express");
const http = require("http");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
const cookieParser = require("cookie-parser");
const client = require("./db/client");
const router = express.Router();
const config = require("./config");
const { COOKIE_SECRET } = require("./secrets");
const indexRouter = require("./api/index");

require("dotenv").config();
const app = express();

app.use(cookieParser(COOKIE_SECRET));
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist/")));

app.get("/", (req, res) => {
  const indexPath = path.join(__dirname, "../client/dist/index.html");
  res.sendFile(indexPath);
});

// Define your routes for customer queries here
const url = config.client;


const connect = client.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect(
  () => {
    console.log("Connected to database: Store");
  },
  (err) => console.log(err)
);
app.use("/api", indexRouter);

// Define the route for making external API calls
app.get("/api/search", async (req, res) => {
  const { q } = req.query;
  try {
    const response = await axios.request({
      url: "https://real-time-amazon-data.p.rapidapi.com/search",
      params: {
        query: q,
        country: "US",
      },
      headers: {
        "X-RapidAPI-Key": "560011da9bmsh83c028acaee1b02p1ed28djsn902b2020edfc",
        "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
