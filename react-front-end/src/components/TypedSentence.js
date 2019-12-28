import React from 'react';
import Typed from 'react-typed';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {    
    color: 'blue',    
    height: theme.spacing(11)   
  }
}));

export default function TypedSentence() {
  const classes = useStyles();

  return (
    
    <Typography variant="h5" align="center" color="textSecondary" paragraph className={classes.root}>
        <Typed
            strings={['Connecting you ^1000 with Calgary\'s best mechanics. ^1000 Simply sign in or sign up and start using the application today!', 'Our commitment to customer service, ^1000 integrity, ^1000 ethical leadership, ^1000 and loyal employees have kept us a strong and respected organization.','Our customers appreciate our care,^1000 understanding, suggestions, and knowledge about us.^1000 They know we are trustworthy.','Let\'s take Car Servicing Seriously.','Mechanics You Can Trust In Calgary.']}
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