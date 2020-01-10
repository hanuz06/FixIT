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
    minHeight: '100%',
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
  PlaceAutoFillStyle: {
    width: '500px',
    border: 'solid red 1px'
  }
}));

export default useStyles;