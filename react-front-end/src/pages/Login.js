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

const useStyles = makeStyles(theme => ({
  paper: {    
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
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(0.5, 0, 0.5),
  },  
  clear: {
    margin: theme.spacing(0.5, 0, 0.5),
    backgroundColor:'grey',
    outline: 'none'
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
  }) 
  
  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const classes = useStyles();
  const {show, hide} = useContext(AlertContext);

  const loginValidation = e => {
    let dataValid = true;
    e.preventDefault();
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;     
    if (!form.email){       
      setForm(previouseValues => ({ ...previouseValues, emailHelperText: "Email required", emailError: true }));
      dataValid = false;           
    } 

    if (!form.password){      
    setForm(previouseValues => ({ ...previouseValues, passwordHelperText: "Password required", passwordError: true }))
    dataValid = false;        
    }  

    if (form.email && !re.test(form.email.toLowerCase())){
      setForm(previouseValues =>({ ...previouseValues, emailHelperText: "Email format is incorrect",emailError: true}));   
      dataValid = false;     
    } 

    const userData = {
      'email':form.email.trim(),
      'password':form.password.trim()
    }
 
  if (dataValid){
    axios.post('/api/user-login', userData )
    .then(response => {     
      sessionStorage.setItem('userId', response.data.user[0].id);   
      sessionStorage.setItem('uName', `${response.data.user[0].first_name} ${response.data.user[0].last_name}`); 
      sessionStorage.setItem('uEmail', `${response.data.user[0].email}`); 
      window.location.reload();     
    })
    .catch(error => {        
      show(error.response.data.message, 'danger');          
    })
  } 
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
              error={form.emailError}              
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
              className={classes.clear}
              onClick= {clearData}              
            >
              Clear
            </Button>
            <Grid container>
              <Grid item xs>                
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