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
import CardMedia from '@material-ui/core/CardMedia';
import RatingSize from '../../components/RatingSize';
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
  boxDivide: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',    
    minHeight: '100vh',
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
}));

const mechanic = {
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

export default function OrderRequest() {  
  const classes = useStyles()

  const [selectedDate, setSelectedDate] = useState(new Date('2019-08-18T11:11:54'));
  const [carSelect, setCarSelect] = useState('select');
  const [makeYear, setMakeYear] = useState(0);
  const [carMake, setCarMake] = useState('');
  const [carMakeError, setCarMakeError] = useState(false);
  const [carMakeErrorText, setCarMakeErrorText] = useState('');
  const [yearMake, setYearMake] = useState('');
  const [yearMakeError, setYearMakeError] = useState(false);
  const [yearMakeErrorText, setYearMakeErrorText] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);
  const [descriptionErrorText, setDescriptionErrorText] = useState('');

  const handleChange = event => {
    setCarSelect(event.target.value);
  };

  const handleMakeYearChange = event => {
    setMakeYear(event.target.value);
  };
  
  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const {show, hide} = useContext(AlertContext);

  const userRequest = e => {
    e.preventDefault();

    if (!carMake && carSelect==='select'){
      setCarMakeError(true)
      setCarMakeErrorText('Car make required')
    }

    if (!yearMake && makeYear===0){
      setYearMakeError(true)
      setYearMakeErrorText('Car make year required')
      
    }
    if (isNaN(Number(yearMake)+1)){
      setYearMakeError(true);    
      setYearMakeErrorText("Make Year should be numbers");
    }

    if (!description){
      setDescriptionError(true)
      setDescriptionErrorText('Please enter problem description')
    }
  }

  const clearForm = () => {
    setCarMakeErrorText('')
    setYearMakeErrorText('')
    setDescriptionErrorText('')
    setCarMakeError(false)
    setYearMakeError(false)
    setDescriptionError(false)
  }

  const clearData = () => {
    setCarMake('');
    setYearMake('');
    setDescription('');
    setCarSelect('select')
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
          </CardActions> 
        </Card>              
      </div>
      <div component="div" className={classes.boxDivide}>
      <form className={classes.form} noValidate>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Day picker"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time picker"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
         </Grid>
        </MuiPickersUtilsProvider>
          <TextField
            className={classes.selectStyle}        
            id="outlined-car-select"
            select
            label="Car make"
            value={carSelect}
            onChange={handleChange}
            onFocus={clearForm}
            SelectProps={{
              native: true,
            }}
            helperText="Please select car make or enter below manually"
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
            id="car_make"
            label="Car Make"
            name="car_make"
            autoComplete="car_make"
            autoFocus
            value={carMake}
            onChange={e => setCarMake(e.target.value)}
            onFocus={clearForm}
            error={carMakeError}
            helperText={carMakeErrorText}
          />
          <TextField
            className={classes.selectStyle}        
            id="outlined-car-select"
            select
            label="Select car make year or enter below manually"
            value={makeYear}
            onChange={handleMakeYearChange}
            onFocus={clearForm}
            SelectProps={{
              native: true,
            }}
            helperText="Please select car make year"
            variant="outlined"
          >
            {carMakeYear.map(option => (
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
            name="year"
            label="Make Year"
            type="year"
            id="year" 
            value={yearMake}
            onChange={e => setYearMake(e.target.value)}
            onFocus={clearForm}
            error={yearMakeError}
            helperText={yearMakeErrorText}             
          />
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
            id="description"  
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
            onClick={userRequest}             
          >
            Confirm the request
          </Button> 
          <Box my={1}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="inherit"
            onClick= {clearData}                      
          >
            Clear
          </Button>
          </Box>           
        </form>        
      </div>
    </Box>
  );
}

