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
    margin: theme.spacing(1, 0, 1),
  }
}));

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState('');
  const [passwordHelperText, setPasswordHelperText] = useState('');

  const classes = useStyles();
  const {show, hide} = useContext(AlertContext);

  const userLogin = e => {
    e.preventDefault();
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;    

    // if (!email&&!password){
    //   setEmailHelperText("Email cannot be empty");
    //   setPasswordHelperText("Password cannot be empty");
    //   setEmailError(true);
    //   setPasswordError(true);
    //   show('Hello buddy', 'danger')
    // } else 
    if (!email){
      setEmailHelperText("Email required");
      setEmailError(true); 
    } 
    // console.log(emailHelperText)     
     if (!password){
      setPasswordHelperText("Password required");
      setPasswordError(true);    
    }  

    if (email && !re.test(email.toLowerCase())){
      setEmailHelperText("Email format is incorrect");
      setEmailError(true);
    } 
  }

  const clearForm = () => {
    setEmailHelperText("")
    setPasswordHelperText("")
    setEmailError(false);
    setPasswordError(false);    
  }

  const clearData = () => {
    setEmail('');
    setPassword('');
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
          <form className={classes.form} noValidate method='POST'>
            <TextField
              variant="outlined"
              margin="normal"
              value={email}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={e => setEmail(e.target.value)}
              onFocus={clearForm}
              //errorText={state.error}
              error={emailError}
              //errorText={'ERRRROR'}
              helperText={emailHelperText}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              value={password}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
              onFocus={clearForm}
              //errorText={'ERRRROR'}
              error={passwordError}
              helperText={passwordHelperText}              
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
              onClick={userLogin}
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