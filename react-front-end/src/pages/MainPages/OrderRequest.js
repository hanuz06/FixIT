import React from 'react';
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
import classNames from 'classnames';

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
  }  
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
  const [selectedDate, setSelectedDate] = React.useState(new Date('2019-08-18T11:11:54'));

  const handleDateChange = date => {
    setSelectedDate(date);
  };

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
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="car_make"
              label="Car Make"
              name="car_make"
              autoComplete="car_make"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="year"
              label="Make Year"
              type="year"
              id="year"              
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
            >
              Confirm the request
            </Button> 
            <Box my={1}>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="inherit"                      
            >
              Clear
            </Button>
            </Box>           
          </form>        
      </div>
    </Box>
  );
}

