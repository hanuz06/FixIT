# Bringing together car mechanics and car owners

This mobile-friendly app was built by Grant Taylor and Andrey Li as a final project @Lighthouse Labs coding bootcamp.

To see a production version on Netlify please click 👉 [FixIT](https://fix-it-lhl.netlify.com/)

## Synopsis

Suppose a car owner has some issues with his car. He visits FixIT website to make a request for inspection. He logs in to web site (or sign up if he has no account), chooses between available mechanics, fills up a request form and presses "Confirm the request" button. After that he waits for confirmation which is reflected on the confirmation page. As soon as status changed to 'completion', the website automatically redirects to a payment page where the customer will make a payment for service and can rate a mechanic. 

## Running backend server

```sh
npm run go
```

## Running frontend server

```sh
npm start
```

## Screenshot of a FixIT app in action

!["Screenshot of a FixIT app in action"](https://media.giphy.com/media/ZBbs2P4a8zPsKFGM9m/giphy.gif)

## Screenshot of a app development schema

Web developer pushes changes to Github repository master branch. 

When CircleCI detects changes it automatically tests the app. If the app test fails it notifies the developer(either on CircleCI site, or via email). If the test is successful the app changes are pushed to Github repository production branch. 

When Netlify detects changes in Github repository production branch it automatically reflects those changes in its own repository.

!["Screenshot of a production schema"](https://github.com/hanuz06/scheduler/blob/master/public/images/scheduler-production-schema.png)

## Short video of CircleCI test of the FixIT app

!["Short video of CircleCI test of the FixIT app"](https://media.giphy.com/media/YmzFekCKwhD3s5x6bo/giphy.gif)

## Screenshot with CircleCI test report

!["Screenshot of a CircleCI test report"](https://github.com/hanuz06/FixIT/blob/master/Readme-pictures/CI-test.png)


## Screenshot of a mobile-friendly landing page

!["Screenshot of a mobile-friendly landing page"](https://raw.githubusercontent.com/hanuz06/FixIT/readme-branch/readme-pictures/fix-it-mobile-1.png)

## Screenshot of a mobile-friendly landing page

!["Screenshot of a mobile-friendly landing page"](https://github.com/hanuz06/FixIT/blob/readme-branch/readme-pictures/fix-it-mobile-2.png)

## Screenshot of a mobile-friendly order page

!["Screenshot of a mobile-friendly order page"](https://github.com/hanuz06/FixIT/blob/readme-branch/readme-pictures/fix-it-mobile-3.png)

## Screenshot of a mobile-friendly order page

!["Screenshot of a mobile-friendly order page"](https://github.com/hanuz06/FixIT/blob/readme-branch/Readme-pictures/fix-it-mobile-4.png)

## Screenshot of a mobile-friendly confirmation page

!["Screenshot of a mobile-friendly confirmation page"](https://github.com/hanuz06/FixIT/blob/readme-branch/readme-pictures/fix-it-mobile-5.png)

## Screenshot of a mobile-friendly payment page

!["Screenshot of a mobile-friendly payment page"](https://github.com/hanuz06/FixIT/blob/readme-branch/readme-pictures/fix-it-mobile-6.png)

## Screenshot of a a frontend diagram

!["Screenshot of a a frontend diagram"](https://github.com/hanuz06/FixIT/blob/master/Readme-pictures/FixIT-App-Diagram.png)

## Screenshot of a a backend Entity Relationship Diagram

!["Screenshot of a a backend Entity Relationship Diagram"](https://github.com/hanuz06/FixIT/blob/master/Readme-pictures/FixIT-ERD.png)


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