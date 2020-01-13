import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Container from '@material-ui/core/Container';
import CardMedia from '@material-ui/core/CardMedia';
import RatingSize from '../../components/RatingSize';
import classNames from 'classnames';
import ConfirmTable from '../../components/ConfirmTable';
import useStyles from './MechanicRatingStyles';
import  {Alert} from '../../components/Alert';
import {AlertContext} from '../../context/alert/alertContext';
import PropTypes from 'prop-types';

// STRIPE 
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from "../../components/CheckoutForm";

export default function MechanicRating({ mechanic, inspection, setRating, backToHome }) {  
  const classes = useStyles()

  const stripeComplete = sessionStorage.getItem("StripePayment")
  const ratingComplete = sessionStorage.getItem("RatingComplete")

  const [stars, setStars] = useState(0); 
  
  const {show, hide} = useContext(AlertContext);

  const setDataForRating = () => {
    const rating = {
      user_id: inspection.user_id,
      mechanic_id: inspection.mechanic_id, 
      inspection_id: Number(inspection.id),     
      inspection_rating: stars
    }
    setRating(rating)
     
  }

  const completeSession = () => {
    sessionStorage.removeItem("Completed")
    sessionStorage.removeItem("inspectionId")
    sessionStorage.removeItem("StripePayment")
    sessionStorage.removeItem("RatingComplete")
    hide()
    backToHome()
  }

  return (
    <Box component="div" className={classes.root}>  
    <Alert />     
      <Container maxWidth="sm" className={classNames(classes.ContainerStyle, classes.secondOrder)}>  
        <div component="div" className={classNames(classes.boxDivide, classes.cardHeightAdjustment)} >  
          <Card className={classes.card}>
          <Typography gutterBottom variant="h5" component="h5">                
          { !ratingComplete && `Please rate" ${mechanic.first_name}!` } 
          { ratingComplete && `You rated ${mechanic.first_name}!` } 
          </Typography>   
            <CardMedia
              className={classes.cardMedia}
              image={mechanic.avatar}
              title="Image title"
            />          
            < RatingSize stars={stars} setStars={setStars}/>                           
            <CardActions>
               { !ratingComplete && <Button size="small" variant="contained" color="primary" onClick={setDataForRating}>
                Submit
              </Button> }
            { ratingComplete && !stripeComplete &&  <h4>Thank you for your feedback!</h4> }   
            {ratingComplete && stripeComplete && <> <h4>Thats it!</h4>
                <Button size="large" variant="contained" color="primary" onClick={completeSession} >
                  Finish
              </Button>
             </>}
            </CardActions>              
          </Card> 
        <div>  
          <Card className={classes.StripeCardStyle}> 
          <StripeProvider apiKey="pk_test_vzAvHy9DyOYmnXgn5fLZ3YEZ00xwGEz8Pv">
            <div className="example">
              <div style={{display: "flex", justifyContent: "space-between", padding: "2px"}}>
                <h5>Pay with Stripe</h5>
                <img src={"https://stripe.com/img/v3/home/social.png"} alt="site logo" height={40}   />
                </div>
              <Elements>
                <CheckoutForm inspection={inspection} mechanic={mechanic}  />
              </Elements>
            </div>
            </StripeProvider>
          </Card>
        </div>
        </div>    
      </Container>
      <Container maxWidth="sm" className={classNames(classes.ContainerStyle, classes.firstOrder)}>
        <div component="div" className={classes.boxDivide}>          
            <Typography component="h4" variant="h4" align="center" color="textPrimary" className={classes.heroContent} gutterBottom >
              One more thing!<br/>
              It's time to rate and pay your mechanic.
            </Typography>                           
              <ConfirmTable inspection={inspection} mechanic={mechanic}/>                  
        </div>
      </Container>
    </Box>
  );
}

MechanicRating.propTypes = {  
  mechanic: PropTypes.object.isRequired,
  inspection: PropTypes.object.isRequired,
  setRating: PropTypes.func.isRequired,
  backToHome: PropTypes.func.isRequired,
}