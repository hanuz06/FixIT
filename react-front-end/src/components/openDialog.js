import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import MechanicCardRating from '../components/MechanicCardRating';

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  card: {
    height: '500px',
    width: '500px',
    display: 'flex',
    flexDirection: 'column',
    padding: '5px',
    alignItems:'center',
    backgroundColor: 'white',
    opacity: '1'
  },  
  cardContent: {
    flexGrow: 1,
    marginBottom: '30px'
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },  
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },  
  image: {  
    display: 'block',   
    width: '500px',
    maxWidth: '100%',
    height: '300px',
    maxHeight:'250px', 
    objectFit: 'cover'  
  }
}));

export default function SimpleDialogDemo({ mechanic, closeModal, modalOpen, onRequest, setMechanicInfo }) {
  const [open, setOpen] = React.useState(false);
  const userId = sessionStorage.getItem('userId') 

  const { first_name, last_name, avatar, avg, description, active } = mechanic;

  const classes = useStyles(); 

  useEffect(() => {

    if (modalOpen === true){
      setOpen(true)    
    } 
  },[modalOpen]);  

  const handleClose = value => {    
    setOpen(false);
    closeModal()
  };

  const mechanicRequest = (mechanic) => {
    
    onRequest();
    setMechanicInfo(mechanic)
  } 

  return (    
  
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} className={classes.dialog} transitionDuration={600}>
      <CssBaseline />      
      <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
        <CloseIcon />
      </IconButton>
      <DialogTitle id="simple-dialog-title" style={{textAlign:'center'}}>Best mechanic ever!</DialogTitle>
        <Card className={classes.card}>                        
          <CardMedia
            className={classes.cardMedia}    
            title="Best mechanic"
          > 
          <img src={avatar} alt="Best mechanic" className={classes.image} />
          </CardMedia>          
          < MechanicCardRating stars={avg} />               
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {first_name} {last_name}
            </Typography>
            <Typography>               
              {description}
            </Typography>
          </CardContent>
          {!active && <Typography gutterBottom variant="subtitle1" className={classes.cardContent} style={{color:'red', opacity: '0.4'}}>                    
                    {mechanic.first_name} is currently unavailable 
                    </Typography>}
          <CardActions>            
            { userId && active &&<Button size="small" type="button" color="primary" onClick={() => mechanicRequest(mechanic) }>
              Request {first_name}
            </Button> }                     
          </CardActions> 
        </Card>
    </Dialog>  
  );
}

SimpleDialogDemo.propTypes = {
  onClose: PropTypes.func,
  mechanic: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  onRequest: PropTypes.func.isRequired,
  setMechanicInfo: PropTypes.func.isRequired,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  avatar: PropTypes.string,
  avg: PropTypes.string,
  description: PropTypes.string,
  active: PropTypes.bool
};
