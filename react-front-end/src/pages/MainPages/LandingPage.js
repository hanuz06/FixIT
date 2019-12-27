import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as HyperLink } from 'react-router-dom';
import RatingSize from '../../components/RatingSize';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import purple from '@material-ui/core/colors/purple';
import SimpleDialogDemo from '../../components/openDialog';

//import { database } from '../../db/database'

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
    color: purple['A200']
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',  
    transition: theme.transitions.create(
      ['all'],
      { 
        duration: theme.transitions.duration.complex,
        easing: theme.transitions.easing.easeInOut }
    ), 
    '&:hover':{
      height: '101%',
      width: '101%',
      cursor: 'pointer',  
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'    
    }
  },  
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  }
}));

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function LandingPage({ mechanics }) {
  const [loading, setLoading] = useState(false)
  const classes = useStyles();

  const LoadingFunction = () => {
     loading? setLoading(false) : setLoading(true)}

  return (
    <React.Fragment>           
      
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm" >
          { loading && <CircularProgress color="secondary" /> }
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              FIXit
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Connecting you with Calgary's best mechanics. Simply sign in or sign up and start using the application today!
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <HyperLink to="/login"><Button color="inherit">Login</Button> </HyperLink>
                </Grid>
                <Grid item>
                  <HyperLink to="/signup"><Button color="inherit">Signup</Button> </HyperLink>
                </Grid>
                <Grid item>
                  <Button color="inherit" onClick={LoadingFunction}>Loading</Button> 
                </Grid>                
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {mechanics.map(mechanic => ( 

              <Grid item key={mechanic.id} xs={12} sm={6} md={4} >  
                <Card className={classes.card}>      
                            
                  <CardMedia
                    className={classes.cardMedia}
                    image = {mechanic.avatar}
                    title="Image title"
                  />   
                  < RatingSize />               
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {mechanic.first_name} {mechanic.last_name}
                    </Typography>
                    <Typography>
                      {mechanic.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {/* <Button size="small" color="primary">
                      View
                    </Button> */}
                    <Button size="small" color="primary">
                      Request {mechanic.first_name}
                    </Button> 
                    <SimpleDialogDemo mechanic={mechanic}/> 
                  </CardActions> 
                </Card>
              </Grid>              
            ))}
          </Grid>
        </Container>          
    </React.Fragment>
  );
}