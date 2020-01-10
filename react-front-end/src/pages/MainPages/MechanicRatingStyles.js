import { makeStyles } from '@material-ui/core/styles';

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
  ContainerStyle: {
    marginRight: '80px',
    [theme.breakpoints.down('sm')]: {
      marginRight: 'auto'     
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
    justifyContent: 'center',
    alignItems: 'center',    
    flexDirection: 'column',
    padding: '10px', 
    margin: '25px',    
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  },  
  cardMedia: {
    maxWidth: '250px',
    width: '100%',
    maxHeight: '150px',  
    height: '100%', 
    objectFit: 'contain',
    padding: '65px',
    //padding: '50%',
    paddingTop: '56.25%', // 16:9    
  },
  cardContent: {
    flexGrow: 1    
  },
  imageStyle: {
    display: 'block',
    width: '250px',
    heigth: '150px',
    border: 'solid red 1px'
  }
}));

export default useStyles;