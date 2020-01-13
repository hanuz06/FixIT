const express = require('express');
const router  = express.Router();

module.exports = (db, check, validationResult, bcrypt) => {
  router.post('/',[
    check('password_digest', 'Password 3 characters required')
    .isLength({ min: 3 })
], async (req, res) => {

  try {
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
        message: 'Incorrect input data'
      });
    }    

  const findUser = await db('users').where({email: req.body.email})  
   
   if (findUser.length !== 0) {     
     return res.status(401).json({ message: 'User exists' })
    } 

  const hashedPassword = await bcrypt.hash(req.body.password_digest, 12)

  const signUpData = {    
    "first_name": req.body.first_name,
    "last_name": req.body.last_name,
    "email": req.body.email,
    "password_digest": hashedPassword,
    "phone": req.body.phone,
    "location": req.body.location
  }

  const userSignUpData = await db('users').insert(signUpData, (['id', 'first_name', 'last_name']))  
   
    res.status(200).json({userSignUpData, message: 'User successfully signed up' });
  } catch (e) {
    res.status(500).json({ message: 'Something is wrong, please try again' });
  }
});
  return router;
};
