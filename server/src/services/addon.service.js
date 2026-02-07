const db = require("../config/db");

exports.createAddon = async (req, res) => {
  const d = req.validated;

  const [r] = await db.execute(
    `INSERT INTO addons (name, price) VALUES (?,?)`,
    [d.name, d.price]
  );

  res.json({ id: r.insertId });
};

exports.getAddons = async (req, res) => {
  const [rows] = await db.execute(
    `SELECT * FROM addons WHERE isActive=TRUE`
  );
  res.json(rows);
};

exports.getAddonById = async (req, res) => {
  const [rows] = await db.execute(
    `SELECT * FROM addons WHERE id=?`,
    [req.params.id]
  );
  res.json(rows[0]);
};

exports.updateAddon = async (req, res) => {
  const d = req.validated;

  await db.execute(
    `UPDATE addons SET name=?, price=? WHERE id=?`,
    [d.name, d.price, req.params.id]
  );

  res.json({ ok: true });
};

exports.deleteAddon = async (req, res) => {
  await db.execute(
    `UPDATE addons SET isActive=FALSE WHERE id=?`,
    [req.params.id]
  );
  res.json({ ok: true });
};
