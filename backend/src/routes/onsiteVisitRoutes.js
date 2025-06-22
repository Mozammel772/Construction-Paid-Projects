const express = require("express");
const { createOnSiteVisit, getAllOnSiteVisits, updateOnSiteVisitStatus } = require("../Controllers/onsiteVisitController");

const router = express.Router();

router.post("/onsitevisits", createOnSiteVisit);
router.get("/onsitevisits", getAllOnSiteVisits);
router.patch("/onsitevisits/:id/status", updateOnSiteVisitStatus);

module.exports = router;
