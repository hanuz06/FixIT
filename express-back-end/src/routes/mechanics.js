const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/', async(req, res) => {

    const mechanicsOBJ = await db.raw('SELECT mechanics.id, first_name, last_name, email, password_digest, phone, location, hourly_rate, active, description, avatar, AVG(inspection_rating) FROM mechanics LEFT JOIN ratings ON mechanics.id = mechanic_id GROUP BY mechanics.id ORDER BY active DESC;');
    let mechanics = mechanicsOBJ.rows;
    console.log(mechanicsOBJ);
    res.json({ mechanics });
  });
  return router;
};
