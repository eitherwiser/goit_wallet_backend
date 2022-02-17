const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middlewares");
const { getAllTransactions, createTransactions } = require("../../controllers");

router.get("/", authenticate, getAllTransactions);
router.post("/", authenticate, createTransactions);

module.exports = router;
