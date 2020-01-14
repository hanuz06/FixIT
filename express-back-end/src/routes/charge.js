const Express = require('express');
const App = Express();
const router  = Express.Router();
App.use(require("body-parser").text());

module.exports = (stripe) => {
  router.post("/", async(req, res) => {
    const stripeInfo = JSON.parse(req.body);
    console.log("POST", stripeInfo.charge, stripeInfo.generatedToken);
    
    try {
      let {status} = await stripe.charges.create({
        amount: stripeInfo.charge,
        currency: "cad",
        description: "FixIt client Charge",
        source: stripeInfo.generatedToken
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
  return router;
};