const express = require('express');
const router  = express.Router();

module.exports = (db, bcrypt) => {
  router.post('/', async(req, res) => {
    
    const {email, password} = req.body;
    
    const user = await db('users').where({email});
    
     if (!user[0]) {
       return res.status(400).json({ message: 'User not found' }) 
      }
  
     const isMatch = await bcrypt.compare(password, user[0].password_digest)
  
    if (!isMatch) {
      return res.status(404).json({ message: 'Password is incorrect' })
    } else { return res.status(200).json({ user }) }
  });

  return router;
};
