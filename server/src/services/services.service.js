const db = require("../config/db");

exports.createService = async (data) => {
  const { name, description, base_price, duration_minutes } = data;

  const [result] = await db.execute(
    `INSERT INTO services 
     (name, description, base_price, duration_minutes)
     VALUES (?, ?, ?, ?)`,
    [name, description, base_price, duration_minutes]
  );

  return result.insertId;
};

exports.getServices = async () => {
  const [rows] = await db.execute(
    `SELECT * FROM services WHERE is_active = TRUE`
  );
  return rows;
};

exports.getServiceById = async (id) => {
  const [rows] = await db.execute(
    `SELECT * FROM services WHERE id = ?`,
    [id]
  );
  return rows[0];
};

exports.updateService = async (id, data) => {
  const { name, description, base_price, duration_minutes } = data;

  await db.execute(
    `UPDATE services 
     SET name=?, description=?, base_price=?, duration_minutes=? 
     WHERE id=?`,
    [name, description, base_price, duration_minutes, id]
  );

  return true;
};

exports.deleteService = async (id) => {
  await db.execute(
    `UPDATE services SET is_active = FALSE WHERE id = ?`,
    [id]
  );

  return true;
};
