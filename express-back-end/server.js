const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8080;

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(Express.static('public'));
//DB
const db = require("./src/db/db.js");

// Sample GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

// Path 
App.get('/api/mechanic', async (req, res) => {
  const mechanic = await db("mechanic"); // making a query to get all todos
  res.json({ mechanic });
});

App.get('/api/person', async (req, res) => {
  const person = await db("person"); // making a query to get all todos
  res.json({ person });
});



App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
