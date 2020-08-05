const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const helmet = require("helmet");
const compression = require("compression");

const PORT = process.env.PORT || 3050;
const app = express();

app.use(helmet());
app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

require("./config/db")(app);

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
