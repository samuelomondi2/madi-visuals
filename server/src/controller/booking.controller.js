const bookingsService = require("../services/booking.service");

exports.createBooking = async (req, res, next) => {
  try {
    const id = await bookingsService.createBooking(req.body);
    res.status(201).json({ message: "Booking created + emails sent", id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getBookings = async (req, res, next) => {
  try {
    const { page, limit, date, status } = req.query;
    const bookings = await bookingsService.getBookings({ page: Number(page), limit: Number(limit), date, status });
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

exports.getBookingById = async (req, res, next) => {
  try {
    const booking = await bookingsService.getBookingById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (err) {
    next(err);
  }
};

exports.updateBooking = async (req, res, next) => {
  try {
    await bookingsService.updateBooking(req.params.id, req.body);
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteBooking = async (req, res, next) => {
  try {
    await bookingsService.deleteBooking(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};
