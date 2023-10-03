// Require Client from pg
const { Client } = require("pg");

const bcrypt = "bcrypt";
//Establishing connect to database (like how we do with http://)
const server = "store";
const client = new Client(`postgres://localhost:5432/${server}`);

//Export for use in other files
module.exports = client;
