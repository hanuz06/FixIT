import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import blue from '@material-ui/core/colors/blue';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import CardMedia from '@material-ui/core/CardMedia';
import MechanicCardRating from '../../components/MechanicCardRating';
import MenuItem from '@material-ui/core/MenuItem';
import classNames from 'classnames';
import { cars, carMakeYear } from '../../helpers/helperData'

import  {Alert} from '../../components/Alert';
import {AlertContext} from '../../context/alert/alertContext';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
// import placesAutofill from "../../helpers/placesAutofill"
import Script from 'react-load-script';
// import { SearchBar as SearchPlace }  from 'material-ui-search-bar';
import PlacesAutoFill from "../../components/PlacesAutoFill"


const useStyles = makeStyles(theme => ({    
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',    
    minHeight: '90vh',
    maxWidth: '100%', 
    marginTop: theme.spacing(1),   
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'     
    }
  },
  ContainerStyle: {
    marginRight: '80px',
    [theme.breakpoints.down('sm')]: {
      marginRight: 'auto'     
    }
  },
  boxDivide: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',    
    minHeight: '100%',
    width: '100%',
    padding: '20px',    
    [`@media (max-width:380px)`]:{
        minHeight: '70vh'
      }       
  },
  card: {
    height: 'auto',
    width: '500px',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px', 
    margin: '25px',    
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  },  
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    maxWidth: '100%'
  },
  cardContent: {
    flexGrow: 1    
  },
  selectStyle: {    
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
      width: '100%',    
  }, 
  PlaceAutoFillStyle: {
    width: '500px',
    border: 'solid red 1px'
  },
  addressStyle: {
    width: '100%',
    height: '50px',
    //borderRadius:'6px'
  },
  form: {
    marginTop: '20px'
  }
}));

export default function OrderRequest({onCancel, userInspectionRequest, mechanic, setInspection, currentUserId, isConfirmed, isCompleted}) {  
  const classes = useStyles()
  
  const [carSelect, setCarSelect] = useState('select');
  const [carSelectError, setCarSelectError] = useState(false);
  const [carSelectErrorText, setCarSelectErrorText] = useState('');

  const [makeYear, setMakeYear] = useState(0);
  const [mechanicData, setMechanicData] = useState('');

  const [carModel, setCarModel] = useState('');
  const [carModelError, setCarModelError] = useState(false);
  const [carModelErrorText, setCarModelErrorText] = useState('');

  // const [yearMake, setYearMake] = useState('');
  const [makeYearError, setMakeYearError] = useState(false);
  const [makeYearErrorText, setMakeYearErrorText] = useState('');

  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);
  const [descriptionErrorText, setDescriptionErrorText] = useState(''); 
  
  const [userAddress, setUserAddress] = useState(''); 
  
  const onPlaceLoaded = (userAddress) => {
    setUserAddress(userAddress)
  }
  console.log('userAddress ',userAddress)

  const handleChange = event => {
    setCarSelect(event.target.value);
  };

  const handleMakeYearChange = event => {
    setMakeYear(event.target.value);
  };  

  const {show, hide} = useContext(AlertContext);

  const userRequestSubmit = e => {
    e.preventDefault();

    if (carSelect==='select'){
      setCarSelectError(true)
      setCarSelectErrorText('Car make required')      
    }

    if (!carModel){
      setCarModelError(true)
      setCarModelErrorText('Car model required')      
    } 

    if (makeYear===0){
      setMakeYearError(true)
      setMakeYearErrorText('Car make year required')      
    }

    if (!description){
      setDescriptionError(true)
      setDescriptionErrorText('Please enter problem description')
      
    }  

    const userRequestData = {
      carSelect,
      carModel,
      makeYear,
      userAddress,
      description
    }

    makeYear&&carSelect&& carModel && description && userInspectionRequest(userRequestData)    
    
    // console.log('AAAAAAAAAA ', mechanicData)
  }

  const clearForm = () => {
    setCarModelErrorText('')
    // setYearMakeErrorText('')
    setDescriptionErrorText('')
    setCarSelectErrorText('')
    setCarModelError(false)
    // setYearMakeError(false)
    setDescriptionError(false)
    setCarSelectError(false)    
  }

  const clearData = () => {
    setCarModel('');    
    setDescription('');
    setCarSelect('select')
    setMakeYear(0);
    clearForm();    
  } 

  return (
    <Box component="div"  className={classes.root}>       
    
      <div component="div" className={classNames(classes.boxDivide, classes.cardHeightAdjustment)} >      
        <Card className={classes.card}>                
          <CardMedia
            className={classes.cardMedia}
            image = {mechanic.avatar}
            title="Image title"
          />   
          < MechanicCardRating stars={mechanic.avg} />               
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
            </Button>
            <Button size="small" color="primary">
              Request {mechanic.first_name}
            </Button>                      */}
          </CardActions> 
        </Card>              
      </div>
      <Container maxWidth="sm" className={classes.ContainerStyle}>
      <div component="div" className={classes.boxDivide}>
      <form className={classes.form} onSubmit={userRequestSubmit} noValidate autoComplete='off'>
          <TextField
            className={classes.selectStyle}        
            id="car-make"
            select
            //label="Car make"
            name='car_make'
            value={carSelect}
            onChange={handleChange}
            onFocus={clearForm}
            error={carSelectError}
            helperText={carSelectErrorText}        
            SelectProps={{
              native: true,
            }}
            variant="outlined"
          >
            {cars.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="car-model"
            label="Car Model"
            name="car_model"            
            autoFocus
            value={carModel}
            onChange={e => setCarModel(e.target.value)}
            onFocus={clearForm}
            error={carModelError}
            helperText={carModelErrorText}
          />
          <TextField
            className={classes.selectStyle}        
            id="outlined-car-select"
            select
            //label="Make year"
            value={makeYear}
            name='year'
            onChange={handleMakeYearChange}
            onFocus={clearForm}
            error={makeYearError}            
            helperText={makeYearErrorText}
            SelectProps={{
              native: true,
            }}
            variant="outlined"
          >
            {carMakeYear.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          
           Please note our mechanics will only service Calgary addresses          
            <PlacesAutoFill onPlaceLoaded={onPlaceLoaded}/>         

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            multiline
            rows="4"
            name="description"
            label="Problem Description"
            type="description"
            id="description_of_problem"  
            value={description}
            onChange={e => setDescription(e.target.value)}
            onFocus={clearForm}
            error={descriptionError}
            helperText={descriptionErrorText}            
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"  
            onClick={()=>setInspection({
              user_id: JSON.parse(currentUserId),
              mechanic_id: mechanic.id,      
              car_make: `${carSelect} ${carModel}`,
              year: parseInt(makeYear),
              location: userAddress,
              description_of_problem: description,
              isConfirmed: false,
              isCompleted: false                          
            })} 
            >                     
          
            Confirm the request
          </Button>          
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onCancel}
            style={{marginTop:'10px'}}             
          >
            Back to mechanics list
          </Button> 
          <Box my={1}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="inherit"
            onClick= {clearData} 
            style={{marginTop:'5px'}}                     
          >
            Clear
          </Button>
          </Box>           
        </form>        
      </div>
      </Container>
    </Box>
  );
}

