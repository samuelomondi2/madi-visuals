const db = require("../config/db");

exports.getAvailabilityByDate = async (req, res) => {
  const date = req.query.date;

  const [rows] = await db.execute(
    `SELECT * FROM availability 
     WHERE date=? AND is_available=TRUE
     ORDER BY start_time`,
    [date]
  );

  res.json(rows);
};
