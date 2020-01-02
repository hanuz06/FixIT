import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import MainPages from './MainPages';
// import LandingPage from './MainPages/LandingPage';
//import OrderRequest from './MainPages/OrderRequest';
//import ConfirmPage from './MainPages/ConfirmPage';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import { flexbox } from '@material-ui/system';
import useVisualMode from '../hooks/useVisualMode'

const LandingPage = React.lazy(()=>import('./MainPages/LandingPage'));
const ConfirmPage = React.lazy(()=>import('./MainPages/ConfirmPage'));
const OrderRequest = React.lazy(()=>import('./MainPages/OrderRequest'));

const useStyles = makeStyles(theme  => ({
  backToTopButton: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    opacity: '0.7'
  },
  loading: {    
    marginTop: '15vh',
    //textAlign: 'center'  
  },
  loadingStyle: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '15vh',
    color: 'secondary'
  }
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top');

    if (anchor) {
      anchor.scrollIntoView({behavior:'smooth'});
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.backToTopButton}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

//This file contains all functions and global state for SPA. 
export default function MainPage(props) {

  const REQUEST = "REQUEST";
  const CONFIRM = "CONFIRM";
  const LANDING = "LANDING";
// const SAVING = "SAVING";
// const CONFIRM = "CONFIRM";
// const DELETING = "DELETING";
// const EDIT = "EDIT";
// const ERROR_SAVE = "ERROR_SAVE";
// const ERROR_DELETE = "ERROR_DELETE";
const { mode, transition, back } = useVisualMode(LANDING);

  const classes = useStyles();

  const [mechanics, setMechanics]=useState([]);  
  const [ratings, setRatings]=useState([]);
  const [users, setUsers]=useState([]);
  const [inspections, setInspections]=useState([]);    
  const [mechanic, setMechanicInfo]=useState(
   {
  id: 1,
  first_name: "Mike",
  last_name: "Smith",
  email: "granttaylor448@gmail.com",
  password_digest: "123",
  phone: 4037000357,
  location: "Calgary",
  hourly_rate: 60,
  active: true,
  description: "best mechanic EVER",
  avatar: "https://www.autotrainingcentre.com/wp-content/uploads/2016/07/there’s-never-been-a-better-time-to-pursue-an-auto-mechanic-career.jpg"
}
  );    
  
  useEffect(() => { 
    
    axios.get('http://localhost:3001/mechanics') 
      .then((response) => {                
        setMechanics(response.data);
      })
    
    axios.get('http://localhost:3001/ratings') 
    .then((response) => {        
      setRatings(response.data);
    })

    axios.get('http://localhost:3001/users') 
    .then((response) => {        
      setUsers(response.data);
    })

    axios.get('http://localhost:3001/inspections') 
    .then((response) => {        
      setInspections(response.data);
    })
  
  },[])  

return (
  <React.Fragment>
  <main id='back-to-top'>  

    {mode === REQUEST && (<Suspense fallback={
    <Box component='div' className={classes.loadingStyle}>
      <CircularProgress />        
    </Box> }> 
      < OrderRequest userRequest={()=> transition(CONFIRM)}
      mechanic={mechanic}  
      onCancel={()=>back()}/> 
    </Suspense>)  }

    {mode ===  LANDING && (<Suspense fallback={ 
    <Box component='div' className={classes.loadingStyle}> 
      <CircularProgress /> 
    </Box> 
    }>
      <LandingPage onRequest={()=>transition(REQUEST)} mechanics={mechanics} setMechanicInfo={setMechanicInfo}
       />
    </Suspense>)}       

    {mode ===  CONFIRM && (<Suspense fallback={ 
      <Box component='div' className={classes.loadingStyle}> 
      <CircularProgress /> 
    </Box>
     }>  
      <ConfirmPage inspection={inspections} />      
    </Suspense>)}
    
    {/* <Suspense fallback={ <h2 className={classes.loading}>Loading...</h2> }>  
      <ConfirmPage mechanics={mechanics} />
    </Suspense>  */}

    {/* < MainPages /> */}
  </main>
   <ScrollTop >
   <Tooltip title="Go to Top" aria-label="Go to Top button" TransitionComponent={Zoom}>
     <Fab color="secondary" size="medium" aria-label="scroll back to top">
       <KeyboardArrowUpIcon />
     </Fab>
   </Tooltip>   
 </ScrollTop>
</React.Fragment>
)
}