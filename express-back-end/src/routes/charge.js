const express = require('express');
const router  = express.Router();
// Stripe
const stripe = require("stripe")(process.env.STRIPE_SK);


module.exports = () => {
  router.post("/", async(req, res) => {
    const stripeInfo = req.body;
    console.log("POST", req.body);
    // console.log(stripeInfo.options.amount)
    try {
      let {status} = await stripe.charges.create({
        amount: stripeInfo.headers.amount,
        currency: "cad",
        description: "FixIt client Charge",
        source: stripeInfo.headers.token
      });
      console.log(status);
      res.json({status});
      console.log(status);
    } catch (err) {
      console.log("Errorrr", err);
      res.json({err});
      res.status(500).end();
    }
  });
};