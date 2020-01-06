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
import  {Alert} from '../components/Alert';
import {AlertContext} from '../context/alert/alertContext';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  paper: {
    //marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',    
    alignItems: 'center',        
    minHeight: '90vh'    
  },
  avatar: { 
    marginTop: theme.spacing(18),   
    backgroundColor: theme.palette.secondary.main,
    margin: 'auto',
    marginBottom: '10px'
  },  
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(0.5, 0, 0.5),
  }
}));

export default function SignIn() {
  const [form, setForm] = useState({
    email: '', 
    password: '',
    emailError: false,
    passwordError: false,
    emailHelperText:'',
    passwordHelperText:'',
    loginDataValid: true
  }) 

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  // async function loginPostRequest(url, data){
  //   const response = await fetch(url, {
  //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //     mode: 'cors', // no-cors, *cors, same-origin
  //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: 'same-origin', // include, *same-origin, omit
  //     headers: {
  //       'Content-Type': 'application/json'
  //       // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     redirect: 'follow', // manual, *follow, error
  //     referrerPolicy: 'no-referrer', // no-referrer, *client
  //     body: data // body data type must match "Content-Type" header
  //   });
  //   return await response.json(); // parses JSON response into native JavaScript objects
  // }

  const classes = useStyles();
  const {show, hide} = useContext(AlertContext);

  const loginValidation = e => {
    e.preventDefault();
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;     
    if (!form.email){       
      setForm(previouseValues => ({ ...previouseValues, emailHelperText: "Email required", emailError: true, loginDataValid: false }))      
    } 

    if (!form.password){      
    setForm(previouseValues => ({ ...previouseValues, passwordHelperText: "Password required", passwordError: true, loginDataValid: false }))       
    }  

    if (form.email && !re.test(form.email.toLowerCase())){
      setForm(previouseValues =>({ ...previouseValues, emailHelperText: "Email format is incorrect",emailError: true, loginDataValid: false }))      
    } 

    const userData = {
      'email':form.email,
      'password':form.password
    }

    form.email && form.password && 
    axios.post('/api/user-login', userData )
    .then(response => {
      console.log('11111111SUCCESSFUL LOGIN ', response.data.user[0].id);  
      sessionStorage.setItem('userId', response.data.user[0].id);   
      window.location.reload();     
    })
    .catch(error => {
      console.log('FAILED LOGIN ERROR ', error.response);  
      show(error.response.data.message, 'danger');
      //window.location.reload();    
    })
  }
  
  
  const clearForm = () => {
    setForm(previouseValues =>({...previouseValues, emailHelperText: "",passwordHelperText:"", emailError: false, passwordError: false, loginDataValid: true}))  
    hide();
  }

  const clearData = () => {    
    setForm(previouseValues => ({ ...previouseValues, email: "", password: ""}))    
    clearForm();    
  }
  

  return (
    <Box className={classes.paper}>
      <Container component="main" maxWidth="xs" >        
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" align='center' variant="h5">
            Sign in
          </Typography>
          <Alert />
          <form className={classes.form} noValidate onSubmit={loginValidation}>
            <TextField
              variant="outlined"
              margin="normal"
              value={form.email}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={changeHandler}
              onFocus={clearForm}
              //errorText={state.error}
              error={form.emailError}
              //errorText={'ERRRROR'}
              helperText={form.emailHelperText}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              value={form.password}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={changeHandler}
              onFocus={clearForm}
              //errorText={'ERRRROR'}
              error={form.passwordError}
              helperText={form.passwordHelperText}              
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
              className={classes.submit}              
            >
              Sign In
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
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>        
      </Container>
    </Box>
  );
} 