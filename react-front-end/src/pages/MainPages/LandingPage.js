import React, { useState, useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './LandingPageStyles.js';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import { Link as HyperLink } from 'react-router-dom';
import RatingSize from '../../components/RatingSize';
import CircularProgress from '@material-ui/core/CircularProgress';
import SimpleDialogDemo from '../../components/openDialog';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import TypeSentence from '../../components/TypedSentence';
import  {Alert} from '../../components/Alert';
import {AlertContext} from '../../context/alert/alertContext';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Badge from '@material-ui/core/Badge';
import UserBadge from '../../components/UserBadge';
import { createMuiTheme } from '@material-ui/core/styles';
import FixitLogo from "../../Photos/Fixit_font.png"
import Avatar from "../../Photos/mechanic-grey.png"
import MechanicCardRating from '../../components/MechanicCardRating'
// STRIPE 
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from "../../components/CheckoutForm"


 
export default function LandingPage({ mechanics, onRequest, setMechanicInfo }) {
  // const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [mechanicData, setMechanic] = useState({})
  const [select, setSelect] = useState('')
  const [mechanicList, setMechanicList] = useState('')

  const {show, hide} = useContext(AlertContext);
  const classes = useStyles(); 


  const rectangle = <div className={classes.shape} />;
  const circle = <div className={clsx(classes.shape, classes.shapeCircle)} />;

  // var options = {
  // const LoadingFunction = () => {
  //    loading? setLoading(false) : setLoading(true)}

  const openModal = (id) => {    
    
    const filteredMechanic = mechanics.filter(mechanic=>{
         return mechanic.id === id
    })
    //console.log('filteredMechanic ',filteredMechanic)
    setMechanic(filteredMechanic[0])
    setModalOpen(true);
  }

  const closeModal = () => {    
    setModalOpen(false);
  };

  const mechanicRequest = (mechanic) => {
    //e.preventDefault();
    //e.stopPropagation();
    onRequest();  
    setMechanicInfo(mechanic)    
    //console.log("This is a mechanic request")    
  }

  const selectMechanic = (e) => setSelect(e.target.value);
  
  const clearSearch = () => {
    setSelect('');    
  }
    
  useEffect(() => {            
      const filtered = mechanics.filter(mechanic => 
        mechanic.first_name.toLowerCase().search(select.toLowerCase()) !== -1 ||
        mechanic.last_name.toLowerCase().search(select.toLowerCase()) !== -1 
        //console.log('MECHANIC ', mechanic)
      ); 
      filtered.length !== 0? setMechanicList(filtered) : setMechanicList(mechanics)  
      !select && hide()
      select && mechanicList === mechanics && show(' No match found', 'success')
      //console.log('select ', select.length)          
    },[select, mechanics]);
    //console.log('MechanicList ',mechanicList)  
    
    const userId = sessionStorage.getItem('userId')

  return (
    <React.Fragment>           
      
        {/* Hero unit */}
    <div className={classes.heroContent}>
      <Container maxWidth="sm" >
      {/* { loading && <CircularProgress color="secondary" /> } */}
        <Typography component="h1"  variant="h2" align="center" color="textPrimary" gutterBottom  className={classes.gutterBottom}>
      <img src={Avatar} alt="site logo" height={100} margin="1em"/>
          <img src={FixitLogo} alt="site logo" height={70} />
        </Typography>             
        <TypeSentence /> 
        <Alert />             
        <form className="form-inline my-2 my-lg-0">
          <input id="searchMechanic" value={select} className="form-control mr-2 mx-sm-auto" onChange={selectMechanic} type="search" placeholder="Search" aria-label="Search" style={{minWidth:'125px', width:'85%'}}/>
          <button className="btn btn-outline-primary my-2 my-sm-0" type="button" onClick={clearSearch}>Clear</button>
        </form>

            {/* <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div> */}

            {/* <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <HyperLink to="/login"><Button color="inherit">Login</Button> </HyperLink>
                </Grid>
                <Grid item>
                  <Hyp()=>n> </HyperLink>
                </Grid()=>
                <Grid ()=>
                  <But()=>tton> 
                </Grid()=>
              </Grid>
            </div> */}
          </Container>
        </div>
        <Divider variant="middle" />
        {/* <div>
          <StripeProvider apiKey="pk_test_vzAvHy9DyOYmnXgn5fLZ3YEZ00xwGEz8Pv">
          <div className="example">
            <h1>React Stripe Elements Example</h1>
            <Elements>
              <CheckoutForm />
            </Elements>
          </div>
          </StripeProvider>
        </div> */}
        
          
        
     
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */} 
                  
          <Grid container spacing={4}>
            {[...mechanicList].map(mechanic => ( 

              <Grid item key={mechanic.id} xs={12} sm={6} md={4} >
                           
                <Card className={classes.card} onClick={()=>openModal(mechanic.id)}>                   
                  <CardMedia
                    className={classes.cardMedia}
                    image = {mechanic.avatar}
                    title="Image title"
                  />   
                  < MechanicCardRating stars={mechanic.avg}/>               
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h5">
                      {mechanic.first_name} {mechanic.last_name}
                    </Typography>
                    <Typography gutterBottom variant="h7" component="h6">                    
                      Inspecion Fee: ${mechanic.hourly_rate} 
                    </Typography>
                    <Typography>
                      {/* {mechanic.description} */}
                    </Typography>
                  </CardContent>
                  <div className={classes.buttonStyle}>
                    <CardActions>
                      {/* <Button size="small" color="primary">
                        View
                      </Button> */}

                      { userId && mechanic.active && 
                      <Button size="small" color="primary" type="button" onClick={()=>mechanicRequest(mechanic)} style={{cursor:'pointer'}} >
                        Request {mechanic.first_name}
                      </Button> }
                      <Button size="small" color="primary" type="button" onClick={()=>mechanicRequest(mechanic)} className={classes.goToTopButton}></Button>
                      {/* <SimpleDialogDemo mechanic={mechanic}/>  */}        
                    </CardActions> 
                    
                    {mechanic.active && <UserBadge />}         
                  </div>
                                   
                  </Card> 
                { modalOpen && 
              <SimpleDialogDemo mechanic={mechanicData} modalOpen={modalOpen} closeModal={closeModal} 
              onRequest={onRequest}
              setMechanicInfo={setMechanicInfo}                
                /> }               
              </Grid>                          
            ))}
          </Grid>          
        </Container>          
    </React.Fragment>
  );
}

LandingPage.propTypes = {
  mechanics: PropTypes.array.isRequired
}