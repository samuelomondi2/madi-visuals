const db = require("../config/db");
const nodemailer = require("nodemailer");

// Email transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";

// Check overlapping bookings
const isTimeSlotAvailable = async (service_id, date, start_time, end_time, excludeBookingId = null) => {
    let sql = `
      SELECT * FROM bookings
      WHERE service_id = ?
        AND booking_date = ?
        AND ((start_time < ? AND end_time > ?) 
             OR (start_time < ? AND end_time > ?) 
             OR (start_time >= ? AND end_time <= ?))`;
    const params = [service_id, date, end_time, end_time, start_time, start_time, start_time, end_time];
  
    if (excludeBookingId) {
      sql += " AND id != ?";
      params.push(excludeBookingId);
    }
  
    const [rows] = await db.execute(sql, params);
    return rows.length === 0;
  };
  

// Create booking with addons
exports.createBooking = async (data) => {
  const {
    service_id, booking_date, start_time, end_time,
    client_name, client_email, client_phone,
    event_type, location, notes, total_amount,
    payment_status = "pending",
    addons = [] // array of addon IDs
  } = data;

  // Check availability
  const available = await isTimeSlotAvailable(service_id, booking_date, start_time, end_time);
  if (!available) throw new Error("Time slot not available");

  // Insert booking
  const [result] = await db.execute(
    `INSERT INTO bookings
     (service_id, booking_date, start_time, end_time, client_name, client_email, client_phone,
      event_type, location, notes, total_amount, payment_status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [service_id, booking_date, start_time, end_time, client_name, client_email, client_phone,
     event_type, location, notes, total_amount, payment_status]
  );

  const bookingId = result.insertId;

  // Insert booking addons
  for (const addon of addons) {
    // Get current addon price
    const [addonRow] = await db.execute(`SELECT price FROM addons WHERE id=? AND is_active=TRUE`, [addon]);
    if (!addonRow[0]) continue;
    await db.execute(
      `INSERT INTO booking_addons (booking_id, addon_id, price_at_booking)
       VALUES (?, ?, ?)`,
      [bookingId, addon, addonRow[0].price]
    );
  }

  // Send email notification
  const emailHtml = `
    <h2>Booking Confirmation</h2>
    <p>Booking ID: ${bookingId}</p>
    <p>Service ID: ${service_id}</p>
    <p>Date: ${booking_date}</p>
    <p>Time: ${start_time} - ${end_time}</p>
    <p>Total: $${total_amount}</p>
    <p>Client: ${client_name} (${client_email})</p>
    <p>Addons: ${addons.join(", ") || "None"}</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: [client_email, ADMIN_EMAIL],
    subject: `Booking Confirmation #${bookingId}`,
    html: emailHtml
  });

  return bookingId;
};

// Get bookings with pagination and filtering
exports.getBookings = async ({ page = 1, limit = 10, date, status }) => {
  const offset = (page - 1) * limit;
  let sql = `SELECT * FROM bookings`;
  const params = [];
  
  if (date) {
    sql += ` WHERE booking_date = ?`;
    params.push(date);
    if (status) {
      sql += ` AND booking_status = ?`;
      params.push(status);
    }
  } else if (status) {
    sql += ` WHERE booking_status = ?`;
    params.push(status);
  }
  
  sql += ` ORDER BY booking_date ASC, start_time ASC LIMIT ? OFFSET ?`;
  params.push(limit, offset);
  
  const [rows] = await db.execute(sql, params);
  return rows;
  
};

// Get booking by ID
exports.getBookingById = async (id) => {
    const [rows] = await db.execute(`SELECT * FROM bookings WHERE id = ?`, [id]);
    return rows[0];    
};

// Update booking
exports.updateBooking = async (id, data) => {
  const {
    service_id, booking_date, start_time, end_time,
    client_name, client_email, client_phone,
    event_type, location, notes, total_amount, payment_status, booking_status,
    addons = []
  } = data;

  // Check availability
  const available = await isTimeSlotAvailable(service_id, booking_date, start_time, end_time, id);
  if (!available) throw new Error("Time slot not available");

  await db.execute(
    `UPDATE bookings
     SET service_id=?, booking_date=?, start_time=?, end_time=?, client_name=?, client_email=?, client_phone=?,
         event_type=?, location=?, notes=?, total_amount=?, payment_status=?, booking_status=?
     WHERE id=?`,
    [service_id, booking_date, start_time, end_time, client_name, client_email, client_phone,
     event_type, location, notes, total_amount, payment_status, booking_status, id]
  );

  // Update addons: delete existing and insert new
  await db.execute(`DELETE FROM booking_addons WHERE booking_id=?`, [id]);
  for (const addon of addons) {
    const [addonRow] = await db.execute(`SELECT price FROM addons WHERE id=? AND is_active=TRUE`, [addon]);
    if (!addonRow[0]) continue;
    await db.execute(
      `INSERT INTO booking_addons (booking_id, addon_id, price_at_booking)
       VALUES (?, ?, ?)`,
      [id, addon, addonRow[0].price]
    );
  }

  return true;
};

// Soft delete booking
exports.deleteBooking = async (id) => {
    await db.execute(`DELETE FROM bookings WHERE id=?`, [id]);
    return true;
  };
  
