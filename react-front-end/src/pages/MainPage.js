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
const MechanicRating = React.lazy(()=>import('./MainPages/MechanicRating'));



const useStyles = makeStyles(theme  => ({
  root: {
    minHeight: '80vh'
  },
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

//This file contains all functions and global state for SPA. 
export default function MainPage(props) {
const inspectionNumber = sessionStorage.getItem('inspectionId')
const currentUserId = sessionStorage.getItem('userId'); 


  const REQUEST = "REQUEST";
  const CONFIRM = "CONFIRM";
  const LANDING = "LANDING";
  const RATING = "RATING";  

const { mode, transition, back } = useVisualMode(LANDING);

  const classes = useStyles();

  const [mechanics, setMechanics]=useState([]);  
  const [ratings, setRatings]=useState([]);
  const [users, setUsers]=useState([]);
  const [inspections, setInspections]=useState([]);      
  const [inspection, setInspection]=useState({         
    // "user_id": 21,
    // "mechanic_id": 22,      
    // "car_make": `ford`,
    // "year": 2005,
    // "location": "calgary",
    // "description_of_problem": "brake",
    // "isConfirmed": false,
    // "isCompleted": false  
  });      
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
  // const [rating, setRating]= useState(0) 

  // const setStars = (newValue) => {    
  //   setRating(newValue);   
    
  // }
  
     
  useEffect(() => { 

    // axios.get('/api/mechanics')
    //   .then(res=>{                
    //     return setMechanics(res.data.mechanics)
    //   })

    Promise.all([
      Promise.resolve(
        axios.get('/api/mechanics')
      .then(res=>{                
        return res.data.mechanics
      })
      ),
      Promise.resolve(
        axios.get('/api/ratings')
        .then(res=>{          
          return res.data.ratings       
      })
      ),
      Promise.resolve(
        axios.get('/api/users')
        .then(res=>{          
          return res.data.users       
      })
      ),
      Promise.resolve(
        axios.get('/api/inspections')
        .then(res=>{          
          return res.data.inspections       
      })
      )          
    ]).then(all=>{        
      setMechanics(all[0])
      setRatings(all[1])
      setUsers(all[2])
      setInspections(all[3])
    })   

  if(inspection.isCompleted === true){
    transition(RATING)
    console.log('GO TO RATING')
   }   

  },[setMechanics,setRatings,setUsers,setInspections, inspection])

  window.onload = function(){
    let inspectionID = JSON.parse(JSON.parse(inspectionNumber)) 
    if (inspectionID){
      inspections.forEach(inspection=>{
        //console.log('TYPEOF ', typeof inspection.id)
        if(inspection.id===inspectionID){
          setInspection(inspection)
        }
      })
      transition(CONFIRM)  
    }    
  }   

  const setRating = (data) => {
    // const ratingData = {
    //   user_id, mechanic_id, rating,
    //   inspection_id: inspection.id
    // }
    console.log('rrrrrr ', data)
    axios.post('/api/set-rating', data )
    .then(response => {
      console.log('RATING RETURN TO FROND END ', response); 
      sessionStorage.removeItem('inspectionId')     
      transition(LANDING)         
    })
    .catch(error => {
      console.log('ERROR ', error);     
    }) 
  }

  //const inspectionId = sessionStorage.getItem('inspectionId'); 
  const userInspectionRequest = (data) => {
    // console.log('userRequestData ', data) 
    const userID = JSON.parse(currentUserId)
    const userData = {         
      "user_id": userID,
      "mechanic_id": mechanic.id,      
      "car_make": `${data.carSelect} ${data.carModel}`,
      "year": data.makeYear,
      "location":data.userAddress,
      "description_of_problem": data.description,
      "isConfirmed": false,
      "isCompleted": false  
    } 
    console.log('INSPECTION ', {inspection})
    
    axios.post('/api/new-inspections', userData )
    .then(response => {
      console.log('SUCCESSFUL INSPECTION REQUEST ', response);
      sessionStorage.setItem('inspectionId', response.data.response[0].id)
      //let stringObject = JSON.stringify(response.config.data);
      let parsedObject = JSON.parse(response.config.data);
      setInspection(parsedObject)
      console.log('MECHANIC LIST ', inspection)
      //sessionStorage.setItem('inspectionId', stringObject)
      transition(CONFIRM)
         
    })
    .catch(error => {
      console.log('ERROR ', error);     
    })    
   
  }

  
return (
  <React.Fragment>
  <main id='back-to-top' className={classes.root}>  

  {mode === RATING && (<Suspense fallback={ 
    <Box component='div' className={classes.loadingStyle}> 
    <CircularProgress /> 
  </Box>
  }>  
    <MechanicRating setRating={setRating} onCancel={()=>back()} />      
  </Suspense>)} 
  

  { mode ===  LANDING && (<Suspense fallback={ 
    <Box component='div' className={classes.loadingStyle}> 
      <CircularProgress /> 
    </Box> 
    }>
      <LandingPage onRequest={()=>transition(REQUEST)} mechanics={mechanics} setMechanicInfo={setMechanicInfo}
       />
    </Suspense>)}       


  {mode === CONFIRM && (<Suspense fallback={ 
      <Box component='div' className={classes.loadingStyle}> 
      <CircularProgress /> 
    </Box>
     }>  
      <ConfirmPage inspection={inspection} />      
    </Suspense>)}

    {mode === REQUEST && (<Suspense fallback={
    <Box component='div' className={classes.loadingStyle}>
      <CircularProgress />        
    </Box> }> 
      < OrderRequest mechanicID={mechanic.id} currentUserId={currentUserId} setInspection={setInspection} userInspectionRequest={userInspectionRequest} 
      mechanic={mechanic} onCancel={()=>back()}
      /> 
    </Suspense>)  }
          
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

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};