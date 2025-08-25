const express = require("express");
const { createBeforeAfter, getBeforeAfterAll, deleteBeforeAfter } = require("../Controllers/beforeAfterController");


const router = express.Router();

// POST → Create blog
router.post("/", createBeforeAfter);

// GET → All blogs
router.get("/", getBeforeAfterAll);

// DELETE → Delete blog
router.delete("/:id", deleteBeforeAfter);

module.exports = router;
