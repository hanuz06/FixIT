import React from 'react';
import Typed from 'react-typed';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {       
    color: 'blue',    
    minHeight: theme.spacing(13),
    marginBottom: theme.spacing(3),    
    [theme.breakpoints.down('sm')]:{
      minHeight: theme.spacing(16),
      fontSize:'1.4rem'
    }  
  }
}));

export default function TypedSentence() {
  const classes = useStyles();

  return (
    
    <Typography variant="h5" align="center" color="textSecondary" paragraph className={classes.root}>
        <Typed
            strings={['We want to connect you with Calgary\'s best mechanics. ^1000 So we decided to do car repair a little differently','Let\'s take Car Servicing Seriously.','Mechanics You Can Trust In Calgary.']}
            typeSpeed={80}
            backSpeed={70}
            backDelay={5000}
            smartBackspace={true}
            fadeOut={true}
            fadeOutDelay={2000}
            shuffle={true}
            loop
        /> 
    </Typography>  
      
    
  )
}