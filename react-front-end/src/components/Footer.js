
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {    
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',       
    width: '100%',
    height: '10vh'
  }
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        FixIT
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function LabelBottomNavigation() {
  const classes = useStyles();  

  return (
    <footer className={classes.root}>
      <div maxwidth="xs" >   
          <Copyright />     
      </div >
    </footer>
  );
}
