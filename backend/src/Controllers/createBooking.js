const { ObjectId } = require("mongodb");
const { getBookingCollection } = require("../config/db");

const createBooking = async (req, res) => {
  try {
    const { date, time, name, phone, message } = req.body;
    const bookingDateTime = new Date(`${date}T${time}`);

    const bookingsCollection = getBookingCollection("bookings");

    // 10 minutes before and after
    const tenMinBefore = new Date(bookingDateTime.getTime() - 10 * 60 * 1000);
    const tenMinAfter = new Date(bookingDateTime.getTime() + 10 * 60 * 1000);

    const conflict = await bookingsCollection.findOne({
      bookingDateTime: {
        $gte: tenMinBefore,
        $lte: tenMinAfter,
      },
    });

    if (conflict) {
      return res.status(409).json({ message: "Time slot already booked." });
    }

    const booking = {
      bookingDateTime,
      name,
      phone,
      status: "unsolved",
      message,
      createdAt: new Date(),
    };
console.log(booking)
    await bookingsCollection.insertOne(booking);
    res.status(201).json({ message: "Booking confirmed!" });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getAllBookings = async (req, res) => {
  try {
    const bookingsCollection = getBookingCollection("bookings");

    const bookings = await bookingsCollection
      .find({})
      .sort({ bookingDateTime: -1 }) // latest first
      .toArray();

    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};


const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const bookingsCollection = getBookingCollection("bookings");

    const result = await bookingsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Status update error:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
};

module.exports = { createBooking, getAllBookings,updateBookingStatus };
