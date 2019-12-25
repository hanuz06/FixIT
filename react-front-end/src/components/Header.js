import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <Box className={classes.root} maxWidth="xs">
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />          
          <Button color="inherit" href="/">Home</Button> 
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            
          </Typography>
          <Button color="inherit" href="/login">Login</Button> 
          <Button color="inherit" href="/signup">Signup</Button>          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
