const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const router = require("./routers/index");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(router);

module.exports = app;
