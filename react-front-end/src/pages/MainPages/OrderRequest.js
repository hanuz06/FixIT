import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import CardMedia from '@material-ui/core/CardMedia';
import MechanicCardRating from '../../components/MechanicCardRating';
import classNames from 'classnames';
import { cars, carMakeYear } from '../../helpers/helperData';
import useStyles from './OrderRequestStyles.js';
import  {Alert} from '../../components/Alert';
import {AlertContext} from '../../context/alert/alertContext';
import PlacesAutoFill from "../../components/PlacesAutoFill";
import PropTypes from 'prop-types';

export default function OrderRequest({onCancel, userInspectionRequest, mechanic, setInspection, currentUserId }) {  
  const classes = useStyles()
  
  const [carSelect, setCarSelect] = useState('');
  const [carSelectError, setCarSelectError] = useState(false);
  const [carSelectErrorText, setCarSelectErrorText] = useState('');  
  
  const [carModel, setCarModel] = useState('');
  const [carModelError, setCarModelError] = useState(false);
  const [carModelErrorText, setCarModelErrorText] = useState('');  
  
  const [makeYear, setMakeYear] = useState(0);
  const [makeYearError, setMakeYearError] = useState(false);
  const [makeYearErrorText, setMakeYearErrorText] = useState('');

  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);
  const [descriptionErrorText, setDescriptionErrorText] = useState(''); 
  
  const [userAddress, setUserAddress] = useState(''); 
  
  const onPlaceLoaded = (userAddress) => {
    setUserAddress(userAddress)
  }  

  const handleChange = event => {
    setCarSelect(event.target.value);
  };

  const handleMakeYearChange = event => {
    setMakeYear(event.target.value);
  };  

  const {show, hide} = useContext(AlertContext);

  const userRequestSubmit = e => {
    e.preventDefault();

    if (carSelect===''){
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

    if (!userAddress){
      show('Please enter your location in Calgary', 'success')
    }

    const userRequestData = {
      carSelect,
      carModel,
      makeYear,
      userAddress,
      description
    }
    makeYear&&carSelect&& carModel && description && userAddress && userInspectionRequest(userRequestData)      
  }

  const clearForm = () => {
    setCarModelErrorText('')
    setMakeYearErrorText('')
    setDescriptionErrorText('')
    setCarSelectErrorText('')    
    setCarModelError(false)   
    setMakeYearError(false)
    setDescriptionError(false)
    setCarSelectError(false)  
    hide()  
  }

  const clearData = () => {
    setCarModel('');    
    setDescription('');
    setCarSelect('')
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
        </Card>              
      </div>
      <Container maxWidth="sm" className={classes.ContainerStyle}>        
      <div component="div" className={classes.boxDivide}>
      <form className={classes.form} onSubmit={userRequestSubmit} noValidate autoComplete='off'>
          <TextField
            className={classes.selectStyle}        
            id="car-make"
            select            
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
           <Alert />      
           <PlacesAutoFill userAddress={userAddress} onPlaceLoaded={onPlaceLoaded}/>         

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
              description_of_problem: description                                        
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
 
OrderRequest.propTypes = {
  onCancel: PropTypes.func.isRequired,
  userInspectionRequest: PropTypes.func.isRequired,
  mechanic: PropTypes.object.isRequired,
  setInspection: PropTypes.func.isRequired,
  currentUserId: PropTypes.string.isRequired
}
