# FixIT app bringing together car mechanics and car drivers

This mobile-friendly app was built by Grant Taylor and Andrey Li as a final project @Lighthouse Labs coding bootcamp.

To see a production version on Netlify please click 👉 [FixIT](https://fix-it-lhl.netlify.com/)

## Synopsis

Suppose a car owner has some problems with his car. He goes to our website to order a request for inspection. He logs in to web site (or sign up if he has no account), chooses between available mechanics, fills up a request form and presses "Confirm the request" button. After that he waits for confirmation which is reflected on the confirmation page. As soon as status changed to 'completion', the website redirects to payment page where the customer will make a payment for service.

-------------------------

## Dependencies

bcryptjs ^2.4.3
body-parser ^1.18.3"
cors": ^2.8.5"
dotenv ^8.2.0"
express ^4.17.1
express-validator ^6.3.1
knex ^0.20.6
npx ^10.2.0
pg ^7.17.0
socket.io ^2.3.0
stripe ^8.0.1
twilio ^3.33.0
Node 12.x or above
NPM 5.x or above
@material-ui/core ^4.8.0
@material-ui/icons ^4.5.1
@material-ui/lab ^4.0.0-alpha.39
axios ^0.18.1
bootstrap ^4.4.1
classnames ^2.2.6
concurrently ^5.0.2
cypress ^3.8.2
http-proxy-middleware ^0.20.0
jquery ^1.9.1
material-ui-search-bar ^0.4.2
mui-autocomplete ^1.0.7
node-sass ^4.13.0
popper.js ^1.16.0
query-string-object ^0.2.5
react ^16.8.6
react-dom ^16.8.6
react-google-autocomplete ^1.1.2
react-load-script 0.0.6
react-router ^5.1.2
react-router-dom ^5.1.2
react-scripts 2.1.8
react-stripe-elements ^6.0.1
react-transition-group ^4.3.0
react-typed ^1.2.0
socket.io ^2.3.0
socket.io-client ^2.3.0
twilio ^3.33.0
typed.js ^2.0.11
unzip ^0.1.11

-----------------------

## Running backend server

```sh
npm run go
```

## Screenshot of FixIT app in action

!["Screenshot of FixIT app in action"](https://media.giphy.com/media/ZBbs2P4a8zPsKFGM9m/giphy.gif)


## Screenshot of a frontend diagram

!["Screenshot of a frontend diagram"](https://github.com/hanuz06/FixIT/blob/master/Readme-pictures/FixIT-App-Diagram.png?raw=true)

## Screenshot of a backend Entity Relationship Diagram

!["Screenshot of a backend Entity Relationship Diagram"](https://github.com/hanuz06/FixIT/blob/master/Readme-pictures/FixIT-ERD.png?raw=true)

## Short video of CircleCI test of the FixIT app

!["Short video of CircleCI test of the FixIT app"](https://media.giphy.com/media/YmzFekCKwhD3s5x6bo/giphy.gif)

## Screenshot with CircleCI test report

!["Screenshot of CircleCI test report"](https://github.com/hanuz06/FixIT/blob/master/Readme-pictures/CI-test.png?raw=true)






npm run cypress

psql -h ec2-174-129-33-230.compute-1.amazonaws.com -p 5432 -U odhaiescgyvsej -d d71d6dvvq99sm1

git subtree push --prefix express-back-end heroku master

sudo lsof -t -i:8080
sudo kill -9 <PID>

psql -h localhost -U development fixit_development

ngrok http 3000 -host-header="localhost:3000"
ngrok http 3002 -host-header="localhost:3002"

npx knex seed:run --specific=mechanic.js
npx knex migrate:run --specific=mechanic.js
npx knex migrate:rollback
npx knex migrate:latest

A boilerplate project for anyone interested in making a project that uses React and Express.

This repository is a bootleg of @NimaBoscarino's [React Rails Boilerplate](https://github.com/NimaBoscarino/react-rails-boilerplate). It uses the same React app, but replaces the Rails server with an Express server.

Note! This boilerplate has _no fluff_! That means that there's nothing set up for you to do authentication stuff, there's no Redux stuff, and there's no React Router stuff. On the Express end, there is no session storage or database connection.

The main important bit is that the React project has `proxy` set to `localhost:8080` in the `package.json` file, and that the Express app listens to port 8080 in `server.js`. Take a look!

You can (and perhaps should) rename the directories `express-back-end` and `react-front-end` if you want-- The name doesn't matter.

## Running the projects

You need **TWO** terminal windows/tabs for this (or some other plan for running two Node processes).

In one terminal, `cd` into `react-front-end`. Run `npm install` or `yarn` to install the dependencies. Then run `npm start` or `yarn start`, and go to `localhost:3000` in your browser.

In the other terminal, `cd` into `express-back-end`. Run `npm install` or `yarn` to install the dependencies, then `npm start` or `yarn start` to launch the server.

In the browser, you can click on the button and see the data get loaded.

If this doesn't work, please message me!

## Next steps

From here, you can start working on your project!

As soon as the dependencies are installed, your Express server can serve JSON and static assets (like images) in response to API calls from the React app. You can get started on developing your React app, routing plan, etc. right away! Any request that isn't handled by React is passed on to the Express server. That means that you can call a route like `/api/users` from React using `fetch`, `axios`, or something else, and Express will receive it as though they originated from the same app. For routing, best practice is to namespace all of your data routes to `/api`, so that they don't clash with other routing schemes, like React Router.

At some point, you'll likely want to install and configure a database driver for Postgres or MongoDB-- Refer to past projects for hints on how to do this.

And don't forget to update the README!

## Example Projects

You might want to look at examples of projects that have used this boilerplate for hints on how to extend it. Here are a few:

* [Later Cart](https://github.com/bonitac/later-cart)
* [Buddi.io](https://github.com/Danny-Tran/buddi.io)

If you'd like your project added to the list, please shoot me a message.

## Contact

Please contact me on Slack (@garrettgsb) or Nima at `nima@lighthouselabs.com` if you have any questions, requests, or feedback, or post an issue to this repo. If you are using the boilerplate, I'd love to hear from you as well!
