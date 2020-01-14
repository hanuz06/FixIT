import { makeStyles } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: '#f8f9fa',
    padding: theme.spacing(0, 0, 4)
  },
  heroButtons: {
    marginTop: theme.spacing(4),
    color: purple['A200']
  },
  cardGrid: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4), 
    '&:hover': {
      cursor: 'pointer'
    }
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
  buttonStyle: {
    display: 'flex',
    justifyContent: "space-between",
    alignItems: 'center'  
  },

  gutterBottom: {
    marginTop: "1em"
  },
  
  goToTopButton: {
    cursor:'pointer', 
    border: 'none', 
    outline:'none'   
    },
  loginRequest: {
    display: 'flex',
    justifyContent: 'center',    
    padding: '5px 20px ',
    margin: '20px auto 0',
    fontSize: '1.6rem',
    color: '#0f44a6'
  },
  userUnavailableText: {
    color:'red', 
    opacity: '0.4', 
    margin:'auto', 
    marginBottom: '15px'
  } 
}));

export default useStyles;