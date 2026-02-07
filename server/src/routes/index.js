const express = require("express");

const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const serviceRoutes = require("./services.routes");
const bookingRoutes = require("./booking.routes");

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/services', serviceRoutes);
router.use('/booking', bookingRoutes);

module.exports = router;