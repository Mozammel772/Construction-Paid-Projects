const express = require("express");
const { admingenerateToken } = require("../Controllers/TokenController");


const router = express.Router();

router.post("/generate-token", admingenerateToken);

module.exports = router;
