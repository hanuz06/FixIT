import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import purple from '@material-ui/core/colors/purple';
import ConfirmTable from '../../components/ConfirmTable';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    minHeight: '90vh',
    maxHeight: '100%'    
  },
  heroContent: {
    backgroundColor: '#f8f9fa',
    marginTop: theme.spacing(10),
    padding: theme.spacing(0, 0, 2) ,
    color: 'blue' ,
    '@media (max-width:400px)': {
      fontSize: '1.8rem'
    } 
  },
  heroButtons: {
    marginTop: theme.spacing(4),
    color: purple['A200']
  },    
  cardMedia: {
    paddingTop: '20px', 
    maxWidth: '200px',
    maxHeight: '100px',
    margin: 'auto'
  },
  buttonStyles: {
    '& > *': {
      margin: theme.spacing(1),
    },
  }
}));

export default function ConfirmPage({inspection, mechanic}) {
  const classes = useStyles(); 

  return (           
      <Box component="div" className={classes.root}>
        <Container className={classes.cardContainer} maxWidth="sm">      
          <Typography component="h4" variant="h4" align="center" color="textPrimary" className={classes.heroContent} gutterBottom >
            { inspection.isConfirmed? <> Sit Tight!<br/>
            Your mechanic is on the way.<br/> <small>This page will update when your inspection is completed.</small></>:<>
            Thank you!<br/>
            We will contact you soon. </>} 
          </Typography>                                 
          <ConfirmTable inspection={inspection} mechanic={mechanic}/>      
        </Container>          
      </Box>   
  );
}

ConfirmPage.propTypes = {
  inspection: PropTypes.object.isRequired,
  mechanic: PropTypes.object.isRequired  
}