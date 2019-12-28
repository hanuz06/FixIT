import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import MainPages from './MainPages';
// import LandingPage from './MainPages/LandingPage';
import OrderRequest from './MainPages/OrderRequest';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

const LandingPage = React.lazy(()=>import('./MainPages/LandingPage'));
const ConfirmPage = React.lazy(()=>import('./MainPages/ConfirmPage'));


const useStyles = makeStyles(theme  => ({
  backToTopButton: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    opacity: '0.7'
  },
  loading: {    
    marginTop: '15vh',
    textAlign: 'center'  
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
  const classes = useStyles();

  const [mechanics, setMechanics]=useState([]);
  const [loading, setLoading]=useState(true);
  const [ratings, setRatings]=useState([]);
  const [users, setUsers]=useState([]);
  const [inspections, setInspections]=useState([]);

  useEffect(() => { 
    
    axios.get('http://localhost:3000/mechanics') 
      .then((response) => {                
        setMechanics(response.data);
      })
    
    axios.get('http://localhost:3000/ratings') 
    .then((response) => {        
      setRatings(response.data);
    })

    axios.get('http://localhost:3000/users') 
    .then((response) => {        
      setUsers(response.data);
    })

    axios.get('http://localhost:3000/inspections') 
    .then((response) => {        
      setInspections(response.data);
    })
  
  },[])  

return (
  <React.Fragment>
  <main id='back-to-top'>
    {/* <Suspense fallback={ <h2 className={classes.loading}>Loading...</h2> }> 
      < OrderRequest mechanics={mechanics}/> 
    </Suspense>   */}

    <Suspense fallback={ <h2 className={classes.loading}>Loading...</h2> }>  
      <LandingPage mechanics={mechanics} />
    </Suspense>  

    {/* <Suspense fallback={ <h2 className={classes.loading}>Loading...</h2> }>  
      <ConfirmPage mechanics={mechanics} />
    </Suspense>  */}

    {/* <Suspense fallback={ <h2 className={classes.loading}>Loading...</h2> }>  
      <ConfirmPage inspection={inspections} />
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