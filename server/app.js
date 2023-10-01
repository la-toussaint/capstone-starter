const express = require("express");
const http = require("http");
const morgan = require("morgan");
const client = require("./db/client");
const router = require("./api/search");


require("dotenv").config();

// client.connect();

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("hello world");
});

// app.get("*", (req, res, next) => {
//   res.status(404).send("Uh oh, what r u looking for?");
// });

app.use((error, req, res, next) => {
  res.status(500).send(error);
});

module.exports = app;
