// const express = require("express");
// const http = require("http");
// const morgan = require("morgan");
// const client = require("./db/client");
// const router = require("./api/search");
// const cors = require("cors");
// const path = require("path");

// require("dotenv").config();

// const app = express();

// client.connect();

// app.use(cors());
// app.use(morgan("dev"));

// app.use(express.json());
// // app.use(express.static(path.join(__dirname, '../client/dist/')));

// app.use("/api", router);

// // app.get("/", (req, res, next));
// // => {
// //     const indexPath = path.join(__dirname, '../client/dist/index.html');//
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
// //     res.sendFile(indexPath)

// app.get("*", (req, res, next) => {
//   res.status(404).send("Uh oh, what r u looking for?");
// });

// app.use((error, req, res, next) => {
//   res.status(500).send(error);
// });

// module.exports = app;

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

const router = require("./api/index");
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
const url = config.client
const connect = client.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan("dev"));
app.use(cookieParser(COOKIE_SECRET));
app.use(express.json());

client.connect(
  () => {
    console.log("Connected to database: store");
  },
  (err) => console.log(err)
);

app.use("/", router);
app.use("/api", router);

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
