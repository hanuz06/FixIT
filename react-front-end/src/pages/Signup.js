import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { AlertContext } from '../context/alert/alertContext';
import  { Alert } from '../components/Alert';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  paper: {    
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
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(0.5, 0, 0.5),
  }
}));

export default function SignUp() {
  const {show, hide} = useContext(AlertContext);
  const classes = useStyles();
    
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    phone: '',
    location: '',
    firstNameText: '',
    lastNameText: '',
    emailText: '',    
    passwordText: '',
    passwordConfirmationText: '',
    phoneText: '',
    locationText: '',
    checked: false,
    firstNameError: false,
    lastNameError: false,
    emailError: false,    
    passwordError: false,
    passwordConfirmationError: false,
    phoneError: false,
    locationError: false    
  })   

  const handleCheckBox = (e) => {
    setForm(previouseValues =>(
      {...previouseValues, 
        checked: e.target.checked
      })
    )
  }

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value.trim() })
  }  

  const clearForm = () => { 
    setForm(previouseValues =>(
    {...previouseValues, 
      firstNameText: '',
      lastNameText: '',
      emailText: '',     
      passwordText: '',
      passwordConfirmationText: '',
      phoneText: '',      
      locationText: '',         
      firstNameError: false,
      lastNameError: false,
      emailError: false,      
      passwordError: false,      
      passwordConfirmationError: false,
      phoneError: false,
      locationError: false
      })
      )
    hide();
  }    

  const clearData = () => { 
    setForm(previouseValues => (
      { ...previouseValues, 
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        phone: '',
        location: '',        
        checked: false}))    
    clearForm()       
  }

  const signUpData = (e) =>{
    e.preventDefault();
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
    let dataValid = true

    if (form.checked === false){
      show('Please agree with the terms', 'success');
      dataValid = false;
    }
    
    if (!form.firstName){ 
      setForm(previouseValues => ({ ...previouseValues, firstNameText: "First name required", firstNameError: true}));
      dataValid = false;
    }   
      
    if (!form.lastName){ 
      setForm(previouseValues => ({ ...previouseValues, lastNameText: "Last name required", lastNameError: true}));  
      dataValid = false; 
    }     

    if (!form.email){
      setForm(previouseValues => ({ ...previouseValues, emailText: "Email required", emailError: true})); 
      dataValid = false;    
    } 
    
     if (!form.password){
      setForm(previouseValues => ({ ...previouseValues, passwordText: "Password required", passwordError: true})); 
      dataValid = false;     
    }
    
    if (!form.passwordConfirmation){
      setForm(previouseValues => ({ ...previouseValues, passwordConfirmationText: "Password confirmation required", passwordConfirmationError: true})); 
      dataValid = false;      
    }

    if (form.password !== form.passwordConfirmation){
      show("Please check that password and password confirmation are the same", 'danger')
      setForm(previouseValues => ({ ...previouseValues, passwordError: true, passwordConfirmationError: true})); 
      dataValid = false;
    }

    if (!form.phone){
      setForm(previouseValues => ({ ...previouseValues, phoneText: "Phone required", phoneError: true})); 
      dataValid = false;       
    }

    if (isNaN(Number(form.phone.trim())+1)){
      setForm(previouseValues => ({ ...previouseValues, phoneText: "Phone number should be numbers", phoneError: true}));
      dataValid = false;         
    }

    if (!form.location){
      setForm(previouseValues => ({ ...previouseValues, locationText: "Location required", locationError: true})); 
      dataValid = false;     
    }   
    
    if (!re.test(form.email.toLowerCase())){
        setForm(previouseValues => ({ ...previouseValues, emailText: "Email format is incorrect", emailError: true}));
        dataValid = false;    
      }     
     
    const userData = {
      'first_name':form.firstName.trim(),
      'last_name':form.lastName.trim(),
      'email':form.email.trim(),
      'password_digest':form.password.trim(),
      'phone':form.phone.trim(),
      'location':form.location.trim()
    }      

    if (dataValid === true){ 
      return  axios.post('/api/user-signup',userData )
              .then(response => {                  
                sessionStorage.setItem('userId', response.data.userSignUpData[0].id);  
                sessionStorage.setItem('uName', `${response.data.userSignUpData[0].first_name} ${response.data.userSignUpData[0].last_name}`);  
                window.location.reload();          
              })
              .catch(error => {                                       
                show(error.response.data.message, 'danger');                    
              }) 
           }      
    }    

  return (   
      <Container component="main" maxWidth="xs" >        
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={signUpData}>
          <Alert />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  value={form.firstName}
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"                                
                  onChange={changeHandler}
                  autoFocus
                  helperText={form.firstNameText}
                  error={form.firstNameError}
                  onFocus={clearForm}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  value={form.lastName}
                  label="Last Name"                 
                  onChange={changeHandler}
                  name="lastName"  
                  helperText={form.lastNameText}  
                  error={form.lastNameError}  
                  onFocus={clearForm}          
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="email"
                  id="email"
                  value={form.email}
                  label="Email Address"                 
                  value={form.email}
                  onChange={changeHandler}
                  name="email"  
                  helperText={form.emailText}
                  error={form.emailError}  
                  onFocus={clearForm}      
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password should have minimum 3 characters"      value={form.password}             
                  onChange={changeHandler}
                  type="password"
                  id="password" 
                  helperText={form.passwordText} 
                  error={form.passwordError} 
                  onFocus={clearForm}     
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="passwordConfirmation"
                  value={form.passwordConfirmation}  
                  label="Password Confirmation"        
                  onChange={changeHandler}
                  type="password"
                  id="passwordConfirmation" 
                  helperText={form.passwordConfirmationText} 
                  error={form.passwordConfirmationError}   
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
                  value={form.phone}
                  onChange={changeHandler}
                  type="phone"
                  id="phone"
                  autoComplete="current-phone"
                  helperText={form.phoneText}
                  error={form.phoneError}
                  onFocus={clearForm}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={form.location}  
                  name="location"
                  label="Location"                 
                  onChange={changeHandler}
                  type="location"
                  id="location"                  
                  inputProps={
                    {
                      autoComplete: "off",
                      form: {
                        autoComplete: "off",
                      }
                    } 
                  }  
                  helperText={form.locationText}
                  error={form.locationError}
                  onFocus={clearForm}
                />                
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox onChange={handleCheckBox} required value="allowExtraEmails" color="primary" />}
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
            >
              Sign Up
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"              
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
