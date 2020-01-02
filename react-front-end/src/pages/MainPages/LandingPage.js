import React, { useState, useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import { Link as HyperLink } from 'react-router-dom';
import RatingSize from '../../components/RatingSize';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import SimpleDialogDemo from '../../components/openDialog';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import TypeSentence from '../../components/TypedSentence';
import  {Alert} from '../../components/Alert';
import {AlertContext} from '../../context/alert/alertContext';
import '../../index.scss'

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)    
  },
  heroButtons: {
    marginTop: theme.spacing(4),
    color: purple['A200']
  },
  cardGrid: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',  
    transition: theme.transitions.create(
      ['all'],
      { 
        duration: theme.transitions.duration.complex,
        easing: theme.transitions.easing.easeInOut }
    ), 
    '&:hover':{
      height: '101%',
      width: '101%',      
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'    
    }
  },  
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  // search: {
  //   position: 'relative',
  //   border: 'solid grey 1px',
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: fade(theme.palette.common.white, 0.15),
  //   '&:hover': {
  //     backgroundColor: fade(theme.palette.common.white, 0.25),
  //   },
  //   marginRight: theme.spacing(2),
  //   marginLeft: 0,
  //   width: '100%',
  //   [theme.breakpoints.up('sm')]: {
  //     marginLeft: theme.spacing(3),
  //     width: 'auto',
  //   },
  // },
  // searchIcon: {
  //   width: theme.spacing(7),
  //   height: '100%',
  //   position: 'absolute',
  //   pointerEvents: 'none',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  mechanicCardStyle: {
    
  },
  mechanicName: {

  }
}));
 
export default function LandingPage({ mechanics }) {
  // const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [mechanicData, setMechanic] = useState({})
  const [select, setSelect] = useState('')
  const [mechanicList, setMechanicList] = useState('')

  const {show, hide} = useContext(AlertContext);
  const classes = useStyles(); 

  // var options = {
  // const LoadingFunction = () => {
  //    loading? setLoading(false) : setLoading(true)}

  const openModal = (mechanic) => {
    setModalOpen(true);
    setMechanic(mechanic);
  }

  const closeModal = () => {    
    setModalOpen(false);
  };

  const mechanicRequest = (event) => {
    event.stopPropagation();
    console.log("This is a mechanic request")    
  }

  const selectMechanic = (e) => {
    setSelect(e.target.value);    
  }
    
  useEffect(() => {   
      show(select, 'success')
      //console.log('mechanics ', mechanics)       
      const filtered = mechanics.filter(mechanic => 
        mechanic.first_name.toLowerCase().search(select.toLowerCase()) !== -1 ||
        mechanic.last_name.toLowerCase().search(select.toLowerCase()) !== -1 
      ); 
      filtered.length !== 0? setMechanicList(filtered) : setMechanicList(mechanics)          
    },[select]);
    //console.log('MechanicList ',mechanicList)    

  return (
    <React.Fragment>           
      
        {/* Hero unit */}
    <div className={classes.heroContent}>
      <Container maxWidth="sm" >
      {/* { loading && <CircularProgress color="secondary" /> } */}
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          FIXit
        </Typography>             
        <TypeSentence /> 
        <Alert />             
        <form className="form-inline my-2 my-lg-0">
          <input id="searchMechanic" className="form-control mr-2 mx-sm-auto" onChange={selectMechanic} type="search" placeholder="Search" aria-label="Search" style={{minWidth:'120px', width:'80%'}}/>
          <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
        </form>

            {/* <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div> */}

            {/* <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <HyperLink to="/login"><Button color="inherit">Login</Button> </HyperLink>
                </Grid>
                <Grid item>
                  <HyperLink to="/signup"><Button color="inherit">Signup</Button> </HyperLink>
                </Grid>
                <Grid item>
                  <Button color="inherit" onClick={LoadingFunction}>Loading</Button> 
                </Grid>                
              </Grid>
            </div> */}
          </Container>
        </div>
        <Divider variant="middle" />
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}         
           
          <Grid container spacing={4}>
            {[...mechanicList].map(mechanic => ( 

              <Grid item key={mechanic.id} xs={12} sm={6} md={4} className={classes.mechanicCardStyle}>      
              { modalOpen && 
              <SimpleDialogDemo mechanic={mechanicData} modalOpen={modalOpen} closeModal={closeModal} /> }              
                <Card className={classes.card} onClick={()=>openModal(mechanic)}>                            
                  <CardMedia
                    className={classes.cardMedia}
                    image = {mechanic.avatar}
                    title="Image title"
                  />   
                  < RatingSize />               
                  <CardContent className={classes.cardContent}>
                    <Typography className={classes.mechanicName} gutterBottom variant="h5" component="h5">
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
                    <Button size="small" color="primary" onClick={ mechanicRequest } style={{cursor:'pointer'}}>
                      Request {mechanic.first_name}
                    </Button> 
                    <SimpleDialogDemo mechanic={mechanic}/> 
                  </CardActions>                  
                </Card>                
              </Grid> 
                         
            ))}
          </Grid>          
        </Container>          
    </React.Fragment>
  );
}