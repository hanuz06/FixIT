const express = require('express');
const router  = express.Router();

module.exports = (db, check, validationResult) => {
  router.post('/',[
    check('password_digest', 'Password 6 characters required')
      .isLength({ min: 6 })
  ], async(req, res) => {
    try {
      
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array(),
          message: 'Incorrect input data'
        });
      }
      
      const findUser = await db('users').where({email: req.body.email});
    
      console.log('findUser ', findUser.length);
      if (findUser.length !== 0) {
        console.log('EMAIL EXISTS');
        return res.status(401).json({ message: 'Email exists' });
      }
  
      //console.log('user not found...')
      const userSignUpData = await db('users').insert(req.body, (['id', 'first_name', 'last_name']));
     
      res.status(200).json({userSignUpData, message: 'User successfully signed up' });
    } catch (e) {
      res.status(500).json({ message: 'Something is wrong, please try again' });
    }
  });
  return router;
};
