import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import RatingSize from '../../components/RatingSize';
import purple from '@material-ui/core/colors/purple';
import ConfirmCard from '../../components/ConfirmCard';
import ConfirmTable from '../../components/ConfirmTable';

//import { database } from '../../db/database'

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    minHeight: '90vh',
    maxHeight: '100%',
    marginTop: '60px'
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(10),
    padding: theme.spacing(2, 0, 2) ,
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
  }
}));

export default function ConfirmPage({ inspection }) {
  const classes = useStyles();

  return (
    <React.Fragment>   
      
      <div className={classes.root}>
        <Container className={classes.cardContainer} maxWidth="sm">      
          <Typography component="h4" variant="h4" align="center" color="textPrimary" className={classes.heroContent} gutterBottom >
            Thank you!<br/>
            We will contact you soon.
          </Typography>                            
            <ConfirmTable inspection={inspection}/>       
        </Container>          
      </div>
    </React.Fragment>
  );
}