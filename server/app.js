const express = require("express");
const http = require("http");
const morgan = require("morgan");
const client = require("./db/client");
const router = require("./api/search");
const cors = require('cors')
const path = require('path')
require("dotenv").config();

// client.connect();

const app = express();
app.use("/api", router);
app.use(
  cors()
);
app.use(morgan("dev"));

app.use(bodyParser.json());


app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist/')));

app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '../client/dist/index.html');// app.get("*", (req, res, next) => {
    res.sendFile(indexPath)
});
// app.get("*", (req, res, next) => {
//   res.status(404).send("Uh oh, what r u looking for?");
// });

// app.use((error, req, res, next) => {
//   res.status(500).send(error);
// });

module.exports = app;
