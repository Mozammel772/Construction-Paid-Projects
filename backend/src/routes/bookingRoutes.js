const express = require("express");
const { createBooking, getAllBookings, updateBookingStatus } = require("../Controllers/createBooking");

const router = express.Router();

router.post("/bookings", createBooking);
router.get("/bookings", getAllBookings);
router.patch("/bookings/:id/status", updateBookingStatus);

module.exports = router;
