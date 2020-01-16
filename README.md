# Connecting you with your next mechanic

FixIT is a single-page (not including Login and Signup) web app built by Grant Taylor and Andrey Li. It is mobile friendly and was built as a final project for LighthouseLabs coding bootcamp.

To see a production version on Netlify please click 👉 [FixIT](https://fix-it-lhl.netlify.com/)

## Synopsis

A car owner has an issue with his car. Tired of his local mechanic, he visits FixIT's website to find a new mechanic. The new customer can create a free account or login. Once logged in they can choose between available mechanics, based on their ratings and descriptions. When they decide on a mechanic, they can fill out an inspection request. When they send the request the mechanic is notified through Twilio. Once the mechanic confirms the inspection the users page updates to the confirmation page. With the mechanic on the way the user can sit tight. Once the mechanic completes the inspection, again through a Twilio text, the website automatically redirects to a payment page where the customer will make a payment for service and can rate their mechanic.

# Downloading the project

Fork and clone this repo

# Running the project localy

## The back-end server

```sh
cd express-back-end
npm install
npm run go
```

## Frontend server

```sh
cd react-front-end
npm install
npm start
```

## Testing

The react front end has cypress e2e testing. to run you have to run the Frontend and Backend servers then a third cypress terminal.

```sh
cd react-front-end
npm run cypress
```

## Screenshot of FixIT app in action

### Landing Page to Mechanic Request and back

!["Screenshot of a FixIT app in action"](https://media.giphy.com/media/ZBbs2P4a8zPsKFGM9m/giphy.gif)

### Example of a mechanic request

!["Screenshot of the FixIT app in action"](https://media.giphy.com/media/LQ2NcAVRu2EH4dQz8W/giphy.gif)

### After a mechanic request, the page transitions to a rate and payment page

!["Screenshot of a FixIT app in action"](https://media.giphy.com/media/L3R4PYkrExTxdxNgeq/giphy.gif)

### After the customer rates and pays they return to the landing page

!["Screenshot of a FixIT app in action"](https://media.giphy.com/media/eMP0gnT7CNsFOOfKjD/giphy.gif)

## Fixit Development Pipeline

The project uses continuous integration through Github, Circle Ci, and Netlify.

When any updates are pushed to master, Circle Ci runs the app's Cypress tests, if they pass, Circle Ci then updates the production branch in Github. Listening for updates to the production branch, Netlify will update when Circle Ci completes the tests, giving the app continous tested integration.

!["Screenshot of a production schema"](https://github.com/hanuz06/scheduler/blob/master/public/images/scheduler-production-schema.png?raw=true)

## Cypress Signup test of the FixIT app

!["Short video an app development schema"](https://media.giphy.com/media/YmzFekCKwhD3s5x6bo/giphy.gif)

## Screenshot with CircleCI test report

!["Screenshot of a CircleCI test report"](https://github.com/hanuz06/FixIT/blob/master/readme-pictures/CI-test.png?raw=true)

## Screenshot of a mobile-friendly landing page

!["Screenshot of a mobile-friendly landing page"](https://github.com/hanuz06/FixIT/blob/readme-branch/readme-pictures/fix-it-mobile-1.png?raw=true)

## Screenshot of a mobile-friendly landing page

!["Screenshot of a mobile-friendly landing page"](https://github.com/hanuz06/FixIT/blob/readme-branch/readme-pictures/fix-it-mobile-2.png?raw=true)

## Screenshot of a mobile-friendly order page

!["Screenshot of a mobile-friendly order page"](https://github.com/hanuz06/FixIT/blob/readme-branch/readme-pictures/fix-it-mobile-3.png?raw=true)

## Screenshot of a mobile-friendly order page

!["Screenshot of a mobile-friendly order page"](https://github.com/hanuz06/FixIT/blob/readme-branch/readme-pictures/fix-it-mobile-4.png?raw=true)

## Screenshot of a mobile-friendly confirmation page

!["Screenshot of a mobile-friendly confirmation page"](https://github.com/hanuz06/FixIT/blob/readme-branch/readme-pictures/fix-it-mobile-5.png?raw=true)

## Screenshot of a mobile-friendly payment page

!["Screenshot of a mobile-friendly payment page"](https://github.com/hanuz06/FixIT/blob/readme-branch/readme-pictures/fix-it-mobile-6.png?raw=true)

## Screenshot of a frontend diagram

!["Screenshot of a frontend diagram"](https://github.com/hanuz06/FixIT/blob/readme-branch/readme-pictures/FixIT-App-Diagram.png?raw=true)

## Screenshot of a backend Entity Relationship Diagram

!["Screenshot of a backend Entity Relationship Diagram"](https://github.com/hanuz06/FixIT/blob/readme-branch/readme-pictures/FixIT-ERD.png?raw=true)

## Dependencies

- Node 12.x or above
- NPM 5.x or above
- bcryptjs ^2.4.3
- body-parser ^1.18.3"
- cors": ^2.8.5"
- dotenv ^8.2.0"
- express ^4.17.1
- express-validator ^6.3.1
- knex ^0.20.6
- npx ^10.2.0
- pg ^7.17.0
- socket.io ^2.3.0
- stripe ^8.0.1
- twilio ^3.33.0
- @material-ui/core ^4.8.0
- @material-ui/icons ^4.5.1
- @material-ui/lab ^4.0.0-alpha.39
- axios ^0.18.1
- bootstrap ^4.4.1
- classnames ^2.2.6
- concurrently ^5.0.2
- cypress ^3.8.2
- http-proxy-middleware ^0.20.0
- jquery ^1.9.1
- material-ui-search-bar ^0.4.2
- mui-autocomplete ^1.0.7
- node-sass ^4.13.0
- popper.js ^1.16.0
- query-string-object ^0.2.5
- react-dom ^16.8.6
- react-google-autocomplete ^1.1.2
- react-load-script 0.0.6
- react-router ^5.1.2
- react-router-dom ^5.1.2
- react-scripts 2.1.8
- react-stripe-elements ^6.0.1
- react-transition-group ^4.3.0
- react-typed ^1.2.0
- socket.io ^2.3.0
- socket.io-client ^2.3.0
- twilio ^3.33.0
- typed.js ^2.0.11
- unzip ^0.1.11
