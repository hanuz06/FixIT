import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({  palette: {    primary: orange  }})
// const theme = createMuiTheme({  palette: {    primary: {      light: orange[200] // same as '#FFCC80',      main: '#FB8C00', // same as orange[600]      dark: '#EF6C00',      contrastText: 'rgb(0,0,0)'    }  }})

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      < App />
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
  