const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middlewares");
const { getStatistics } = require("../../controllers");

router.get("/", authenticate, getStatistics);

module.exports = router;
