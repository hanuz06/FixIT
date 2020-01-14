import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import {ScrollTop} from '../helpers/mainPageHelpers';

import useVisualMode from '../hooks/useVisualMode';

const io = require('socket.io-client');

const LandingPage = React.lazy(()=>import('./MainPages/LandingPage'));
const ConfirmPage = React.lazy(()=>import('./MainPages/ConfirmPage'));
const OrderRequest = React.lazy(()=>import('./MainPages/OrderRequest'));
const MechanicRating = React.lazy(()=>import('./MainPages/MechanicRating'));

const useStyles = makeStyles(theme  => ({
  root: {
    minHeight: '80vh',
    paddingTop: theme.spacing(8)
  },  
  loadingStyle: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '15vh',
    color: 'secondary'
  }
}));

export default function MainPage() {
const inspectionNumber = sessionStorage.getItem('inspectionId')
let inspectionID = inspectionNumber;
const currentUserId = sessionStorage.getItem('userId'); 
const mechanicID = sessionStorage.getItem('mechanicId'); 

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
  const [inspection, setInspection]=useState({});      
  const [mechanic, setMechanicInfo]=useState({});
  
  useEffect(() => {     

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

      if (inspectionID){
        all[3].forEach(inspection=>{          
          if(inspection.id===Number(inspectionID) && !inspection.isCompleted ){
            setInspection(inspection)
            transition(CONFIRM)
          }
          if (inspection.id===Number(inspectionID) && inspection.isCompleted) {
            transition(RATING)
            setInspection(inspection)
          }
        })          
      }  

      if(mechanicID){
        all[0].forEach(mechanic => {
          if(Number(mechanicID)===mechanic.id){
            setMechanicInfo(mechanic)
          }
        })
      }
    }) 



  const socket = io('ws://localhost:8080') 
  //  io('wss://fix-it-backend.herokuapp.com');


  socket.on(
    'mechanics', function (data) {      
      setMechanics(data);      
    } 
  )
  socket.on(
    'inspections', function (data) {      
      setInspections(data);
      const inspectionID = sessionStorage.getItem('inspectionId')
      const Completed = sessionStorage.getItem('Completed', inspection.isCompleted )      
      data.forEach(inspection=>{        
        if(inspection.id===Number(inspectionID) && !Completed ){          
          setInspection(inspection)
          transition(CONFIRM)
        }
        if (inspection.id===Number(inspectionID) && inspection.isCompleted && !Completed) {
          setInspection(inspection)
          sessionStorage.setItem('Completed', inspection.isCompleted )
          transition(RATING)
        }
      }        
      )       
    }
  )    
  },[setMechanics,setRatings,setUsers,setInspections, setInspection ]) 

  const setRating = (data) => {    
    axios.post('/api/set-rating', data )
    .then(res => {       
      sessionStorage.setItem('RatingComplete', true)    
      transition(RATING)         
    })
    // .catch(error => {
    //   show(error.response.data.message, 'danger');    
    // })  
  }
  
  const userInspectionRequest = (data) => {    
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
        
    axios.post('/api/new-inspections', userData )
    .then(response => {      
      sessionStorage.setItem('inspectionId', response.data.response[0].id); 
      sessionStorage.setItem('mechanicId', response.data.response[0].mechanic_id)  
      let parsedObject = JSON.parse(response.config.data);
      setInspection(parsedObject)            
      transition(CONFIRM)         
    })
    .catch(error => {
      console.log('error ', error);   
    }) 
  }     
  
  const backToHome = () => {
    transition(LANDING)
  }  
    
return (
  <React.Fragment>
  <main id='back-to-top' className={classes.root}>    

  {mode === RATING && (<Suspense fallback={ 
    <Box component='div' className={classes.loadingStyle}> 
    <CircularProgress /> 
  </Box>
  }>  
  <MechanicRating backToHome={backToHome} inspection={inspection} mechanic={mechanic} setRating={setRating} onCancel={()=>back()} />      
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
      <ConfirmPage inspection={inspection} mechanic={mechanic} />      
    </Suspense>)}

    {mode === REQUEST && (<Suspense fallback={
    <Box component='div' className={classes.loadingStyle}>
      <CircularProgress />        
    </Box> }> 
      < OrderRequest mechanicID={mechanic.id} currentUserId={currentUserId} setInspection={setInspection} userInspectionRequest={userInspectionRequest} mechanic={mechanic} onCancel={()=>back()}
      /> 
    </Suspense>)  }   
  </main>
   <ScrollTop >
    <Tooltip title="Go to Top" aria-label="Go to Top button" TransitionComponent={Zoom}>
      <Fab color="secondary" size="medium" aria-label="scroll back to top" style={{outline:'none'}}>
        <KeyboardArrowUpIcon />
      </Fab>
    </Tooltip>   
  </ScrollTop>
</React.Fragment>
)
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired, 
  window: PropTypes.func,
};