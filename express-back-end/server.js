const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8080;
const knex = require('knex');

// Express Configuration

App.use(BodyParser.json());
App.use(BodyParser.urlencoded({ extended: true }));
App.use(Express.static('public'));
//DB
const db = require("./src/db/db.js");


// Sample GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

// Path 
App.get('/api/mechanics', async (req, res) => {
  const mechanics = await db("mechanics"); // making a query to get all todos
  res.json({ mechanics });
});

App.get('/api/users', async (req, res) => {
  const users = await db("users"); // making a query to get all todos
  res.json({ users });
});

App.get('/api/ratings', async (req, res) => {
  const ratings = await db("ratings"); // making a query to get all todos
  res.json({ ratings });
});

App.get('/api/inspections', async (req, res) => {
 
  const inspections = await db("inspections"); // making a query to get all todos
  res.json({ inspections });
});


App.post('/api/new-inspections',(req, res) => {
  console.log('requeeee ', req.body)  
  db('inspections').insert(req.body)
  .then((res)=> console.log('result ', res) ) 
  .catch((error)=> console.log('error ', error))   
});

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
