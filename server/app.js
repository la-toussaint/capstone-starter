const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { COOKIE_SECRET } = require("./secrets");
const { authRequired } = require("./api/utils");
const cors = require("cors");
const client = require("./db/client");
const logger = require("morgan");
const config = require("./config");

const indexRouter = require("./api/index");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(
  cors({
    origin: "*",
  })
);
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

require("dotenv").config();
const url = config.client;
const connect = client.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan("dev"));
app.use(cookieParser(COOKIE_SECRET));
app.use(express.json());

client.connect(
  () => {
    console.log("Connected to database: Store");
  },
  (err) => console.log(err)
);

app.use("/", indexRouter);
app.use("/api", indexRouter);

app.post("/test", authRequired);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("*", (req, res, next) => {
  res.status(404).json({ error: "Uh oh, what r u looking for?" });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send(error);
});

module.exports = app; // Router: /api