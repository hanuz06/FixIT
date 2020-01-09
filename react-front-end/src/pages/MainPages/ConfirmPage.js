import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import RatingSize from '../../components/RatingSize';
import purple from '@material-ui/core/colors/purple';
import ConfirmCard from '../../components/ConfirmCard';
import ConfirmTable from '../../components/ConfirmTable';
import  {Alert} from '../../components/Alert';
import {AlertContext} from '../../context/alert/alertContext';
import Button from '@material-ui/core/Button';

//import { database } from '../../db/database'

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    minHeight: '90vh',
    maxHeight: '100%'    
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
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
    paddingTop: '20px', // 16:9
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

export default function ConfirmPage({inspection, getInspectionData}) {
  const classes = useStyles();

  const {show, hide} = useContext(AlertContext);

  return (
    <React.Fragment>   
      
      <div className={classes.root}>
        <Container className={classes.cardContainer} maxWidth="sm">      
          <Typography component="h4" variant="h4" align="center" color="textPrimary" className={classes.heroContent} gutterBottom >
            Thank you!<br/>
            We will contact you soon.
          </Typography> 
          <Alert />                           
            <ConfirmTable inspection={inspection}/>    
            <div className={classes.buttonStyles}>     
        
                <Button variant="contained" color="primary" href="/">
              Link
            </Button>
    </div>   
        </Container>          
      </div>
    </React.Fragment>
  );
}