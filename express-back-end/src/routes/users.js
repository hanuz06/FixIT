const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/', async(req, res) => {
    const users = await db("users"); // making a query to get all users
    res.json({ users });
  });
  return router;
};

