const express = require("express");
const auth = require("../middleware/auth.middleware");
const controller = require("../controller/booking.controller");

const router = express.Router();

router.post("/", auth, controller.createBooking);
router.get("/", auth, controller.getBookings);
router.get("/:id", auth, controller.getBookingById);
router.put("/:id", auth, controller.updateBooking);
router.delete("/:id", auth, controller.deleteBooking);

module.exports = router;
