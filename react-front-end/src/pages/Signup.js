import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {AlertContext} from '../context/alert/alertContext';
import  {Alert} from '../components/Alert';

const useStyles = makeStyles(theme => ({
  paper: {
    //marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '90vh' 
  },
  avatar: {
    marginTop: theme.spacing(9),
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
  }
}));

export default function SignUp() {
  const {show, hide} = useContext(AlertContext);
  const classes = useStyles();

  // const [item, setItem] = useState({
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   password: '',
  //   passwordConfirmation: '',
  //   phone: '',
  //   location: '',
  //   firstNameText: '',
  //   lastNameText: '',
  //   emailText: '',
  //   passwordText: '',
  //   passwordConfirmationText: '',
  //   phoneText: '',
  //   locationText: '',
  //   firstNameError: false,
  //   lastNameError: false,
  //   emailError: false,
  //   passwordError: false,
  //   passwordConfirmationError: false,
  //   phoneError: false,
  //   locationError: false
  // })   
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState(false);
  const [firstNameText, setFirstNameText] = useState('');
  const [lastName, setLastName] = useState(''); 
  const [lastNameError, setLastNameError] = useState(false);
  const [lastNameText, setLastNameText] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailText, setEmailText] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordText, setPasswordText] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordConfirmationError, setPasswordConfirmationError] = useState(false);
  const [passwordConfirmationText, setPasswordConfirmationText] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [phoneText, setPhoneText] = useState('');
  const [location, setLocation] = useState('');
  const [locationError, setLocationError] = useState(false);
  const [locationText, setLocationText] = useState('');

  const clearForm = () => {  
    hide();  
    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setPasswordConfirmationError(false);
    setPhoneError(false);
    setLocationError(false); 
    setFirstNameText('');       
    setLastNameText('');       
    setEmailText('');       
    setPasswordText('');       
    setPasswordConfirmationText('');       
    setPhoneText('');       
    setLocationText('');       
  }

  const clearData = () => {    
    setFirstName('');       
    setLastName('');       
    setEmail('');       
    setPassword('');       
    setPasswordConfirmation('');       
    setPhone('');         
    setLocation('');  
    clearForm()       
  }
    
  const signUpData = e =>{
    e.preventDefault();
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 

    
    if (!firstName){      
      setFirstNameError(true);    
      setFirstNameText("First name required"); 
      show('First name required', 'success')     
    }   
      
    if (!lastName){      
      setLastNameError(true);    
      setLastNameText("Last name required");      
    }     

    if (!email){
      setEmailError(true);      
      setEmailText("Email required");
    } 
    
     if (!password){
      setPasswordText("Password required");
      setPasswordError(true);    
    }
    
    if (!passwordConfirmation){
      setPasswordConfirmationText("Password confirmation required");
      setPasswordConfirmationError(true);    
    }

    if (email && !re.test(email.toLowerCase())){
      setEmailText("Email format is incorrect");
      setEmailError(true);
    } 

    if (!phone){
      setPhoneText("Phone required");
      setPhoneError(true);    
    }

    if (isNaN(Number(phone)+1)){
      setPhoneText("Phone number should be numbers");
      setPhoneError(true);    
    }



    if (!location){
      setLocationText("Location required");
      setLocationError(true);    
    }

  } 
  
  // const changeVal = (e) => {
  //   setItem({[e.target.name]:e.target.value})
  // }

  return (
   
      <Container component="main" maxWidth="xs" >        
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate autoComplete="off">
          <Alert />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"                  
                  value={firstName}                  
                  onChange={e => setFirstName(e.target.value)}
                  autoFocus
                  helperText={firstNameText}
                  error={firstNameError}
                  onFocus={clearForm}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"                  
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  name="lastName"  
                  helperText={lastNameText}  
                  error={lastNameError}  
                  onFocus={clearForm}          
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"                 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  name="email"  
                  helperText={emailText} 
                  error={emailError}  
                  onFocus={clearForm}      
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"                  
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  id="password" 
                  helperText={passwordText} 
                  error={passwordError} 
                  onFocus={clearForm}     
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="passwordConfirmation"
                  label="Password Confirmation"            
                  value={passwordConfirmation}
                  onChange={e => setPasswordConfirmation(e.target.value)}
                  type="password"
                  id="passwordConfirmation" 
                  helperText={passwordConfirmationText}    
                  error={passwordConfirmationError}   
                  onFocus={clearForm}     
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="phone"
                  label="Phone number without spaces and hyphens"                  
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  type="phone"
                  id="phone"
                  autoComplete="current-phone"
                  helperText={phoneText}
                  error={phoneError}
                  onFocus={clearForm}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="location"
                  label="Location"                  
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  type="location"
                  id="location"
                  autoComplete="current-location"
                  helperText={locationText}
                  error={locationError}
                  onFocus={clearForm}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I agree with the terms of service"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick= {signUpData}
            >
              Sign Up
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              //color="secondary"
              className={classes.submit}
              onClick= {clearData}
              style={{backgroundColor:'grey', outline: 'none'}}
            >
              Clear
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>        
      </Container>    
  );
}
