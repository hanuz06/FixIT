// import React, { useState, useEffect, useContext } from 'react';
// import Button from '@material-ui/core/Button';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import { fade, makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';
// import Divider from '@material-ui/core/Divider';
// import { Link as HyperLink } from 'react-router-dom';
// import RatingSize from '../../components/RatingSize';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import purple from '@material-ui/core/colors/purple';
// import SimpleDialogDemo from '../../components/openDialog';
// import SearchIcon from '@material-ui/icons/Search';
// import InputBase from '@material-ui/core/InputBase';
// import MechanicRating from '../pages/MainPages/MechanicRating';
// import PropTypes from 'prop-types';

// const useStyles = makeStyles(theme => ({
//   icon: {
//     marginRight: theme.spacing(2),
//   },
//   heroContent: {
//     backgroundColor: theme.palette.background.paper,
//     padding: theme.spacing(8, 0, 6)    
//   },
//   heroButtons: {
//     marginTop: theme.spacing(4),
//     color: purple['A200']
//   },
//   cardGrid: {
//     paddichildren: PropTypes.element.isRequired, 
//     window: PropTypes.func,
//     paddichildren: PropTypes.element.isRequired, 
//     window: PropTypes.func,
//   },
//   card: {children: PropTypes.element.isRequired, 
//     window: PropTypes.func,
//     height: '100%',
//     display: 'flex',
//     flexDirection: 'column',  
//     transition: theme.transitions.create(
//       ['all'],
//       { 
//         duration: theme.transitions.duration.complex,
//         easing: theme.transitions.easing.easeInOut }
//     ), 
//     '&:hover':{
//       height: '101%',
//       width: '101%',      
//       boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'    
//     }
//   },  
//   cardMedia: {
//     paddingTop: '56.25%', // 16:9
//   },
//   cardContent: {
//     flexGrow: 1,
//   },
//   footer: {
//     backgroundColor: theme.palette.background.paper,
//     padding: theme.spacing(6),
//   },  
//   inputRoot: {
//     color: 'inherit',
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 7),
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: 200,
//     },
//   }
// }));

// export default function MechanicCard({ mechanic }) {
//   const [modalOpen, setModalOpen] = useState(false)

//   const {show, hide} = useContext(AlertContext);
//   const classes = useStyles(); 

//   const openModal = (mechanic) => {
//     setModalOpen(true);
//     setMechanic(mechanic);
//   }

//   const closeModal = () => {    
//     setModalOpen(false);
//   };

//   const mechanicRequest = (event) => {
//     event.stopPropagation();
//     console.log("This is a mechanic request")    
//   }

//   const selectMechanic = (e) => {
//     setSelect(e.target.value);
//   }
  
//   useEffect(() => {
//     select && show(select, 'success');
    
//   },[select]);

//  return (<Grid item key={mechanic.id} xs={12} sm={6} md={4} >      
//               { modalOpen && 
//               <SimpleDialogDemo mechanic={mechanicData} modalOpen={modalOpen} closeModal={closeModal} /> }              
//                 <Card className={classes.card} onClick={()=>openModal(mechanic)}>                            
//                   <CardMedia
//                     className={classes.cardMedia}
//                     image = {mechanic.avatar}
//                     title="Image title"
//                   />   
//                   < MechanicRating stars={4}/>               
//                   <CardContent className={classes.cardContent}>
//                     <Typography gutterBottom variant="h5" component="h2">
//                       {mechanic.first_name} {mechanic.last_name}
//                     </Typography>
//                     <Typography>
//                       {mechanic.description}
//                     </Typography>
//                   </CardContent>
//                   <CardActions>           
//                     <Button size="small" color="primary" onClick={ mechanicRequest } style={{cursor:'pointer'}}>
//                       Request {mechanic.first_name}
//                     </Button> 
//                     <SimpleDialogDemo mechanic={mechanic}/> 
//                   </CardActions>                  
//                 </Card>                
//               </Grid>)
// }