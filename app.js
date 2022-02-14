const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { usersRouter, transactionsRouter } = require("./routes/");
const { joiUserValidation } = require("./middlewares/");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", joiUserValidation, usersRouter);
app.use("/api/transactions", transactionsRouter);

app.use(express.static("public"));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message });
// });
// При невалидном запросе статус ошибки не 500 , а 400
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
