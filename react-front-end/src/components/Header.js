import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import logo from "../images/car-service.png";

const userId = sessionStorage.getItem('userId')

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  buttonStyle: {
    color:'inherit',
    '&:hover': {
      color: 'yellow'
    }
  }
}));

const logoutFunction = () => {
  sessionStorage.removeItem('userId');
  sessionStorage.removeItem('inspectionId');  
}

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <Box className={classes.root} maxWidth="xs">
      <HideOnScroll >
        <AppBar >
          <Toolbar>
            {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />          
            </IconButton> */}
            <Typography>
            <img src="https://image.flaticon.com/icons/png/128/81/81836.png" alt="site logo" height={50} />
          </Typography>
            <Tooltip title="Home" aria-label="Home button" TransitionComponent={Zoom} placement='bottom'>
              <Button className={classes.buttonStyle} href="/">Home</Button> 
            </Tooltip>
            <Typography variant="h6" className={classes.title}>
              
            </Typography>
            <Tooltip title="Sign in" aria-label="Sign in button" TransitionComponent={Zoom} placement='bottom'>
              {userId? <Button className={classes.buttonStyle} onClick={logoutFunction} href="/">Logout</Button> : <Button className={classes.buttonStyle} href="/login">Login</Button> }
            </Tooltip>
            <Tooltip title="Sign up" aria-label="Sign up button" TransitionComponent={Zoom} placement='bottom'>
              <Button className={classes.buttonStyle} href="/signup">Signup</Button> 
            </Tooltip>         
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </Box>    
  );
}
