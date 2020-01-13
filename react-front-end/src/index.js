import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from "axios";

import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

const theme = createMuiTheme({  palette: {    primary: { main: '#01579b', secondary: '#9e9e9e'  }}})

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      < App />
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
  