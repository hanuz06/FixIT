const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post('/', async(req, res) => {
    console.log('LOGIN REQUEST RECEIVED BY PG: ', req.body);
    
    const {email, password} = req.body;
    
    const user = await db('users').where({email});
    console.log('USER ', user);
  
    if (!user[0]) {
      return res.status(400).json({ message: 'User not found' });
    }
   
    let isMatch = false;
  
    if (password === user[0].password_digest) {
      isMatch = true;
    }
    if (isMatch === false) {
      return res.status(404).json({ message: 'Password is incorrect' });
    } else {
      return res.status(200).json({ user });
    }
  });

  return router;
};
