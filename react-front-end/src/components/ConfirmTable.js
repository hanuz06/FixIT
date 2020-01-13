import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Fixit from "../Photos/Fixit_font.png";
import GreyLogo from "../Photos/mechanic-grey.png";
import PropTypes from 'prop-types';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  table: {
    maxWidth: '100%',  
    padding: '5px',  
    border: 'solid grey 2px',     
    tableLayout: 'auto',  
    '@media (max-width:450px)': {
      size: 'small'
    } 
  },
  tableCell: {
    fontSize: '1rem', 
    wordWrap: 'break-word', 
    maxHeight: '100%',  
    border: 'doted grey 1px'   
  }
});

export default function ConfirmTable({ inspection, mechanic }) {

  const { car_make, year, location, description_of_problem, isConfirmed, isCompleted } = inspection;
  const { first_name, last_name } = mechanic;

  const classes = useStyles();  

  const [open, setOpen] = useState(false);  
   
  useEffect(() => {
   
      onlyOnce()      

  },[]);

  const onlyOnce = () => {

    if (isConfirmed) {
      setOpen(true)
    } else {
      setOpen(false)
    }; 
  }


  const handleClose = () => {
    setOpen(false);
  }; 

  return (
    <Fragment>
      {isConfirmed && !isCompleted && <div >      
        <Snackbar open={open} onClose={handleClose}>
          <Alert onClose={handleClose} color="success">
            Your Mechanic is on the way!
          </Alert>
        </Snackbar>      
      </div>}

      {isConfirmed && isCompleted && <div >      
        <Snackbar open={open} onClose={handleClose}>
          <Alert onClose={handleClose} color="success">
            Your Mechanic is all done! Time to rate and pay!
          </Alert>
        </Snackbar>      
      </div>}

      <TableContainer component={Paper} style={{"overflowX":"auto"}}>
        <Table className={classes.table} aria-label="simple table" >
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell} style={{ 'width':'150px'}}><img src={Fixit} alt="site logo" height={40}   /> <img src={GreyLogo} alt="site logo" height={40}   /></TableCell>
              <TableCell className={classes.tableCell} style={{ 'fontSize':'1.5rem'}}> Inspection Summary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>          
            <TableRow>  
              <TableCell component="th" scope="row" className={classes.tableCell}>
              Your Mechanic
              </TableCell>
              <TableCell className={classes.tableCell}>{first_name} {last_name}</TableCell>
            </TableRow> 

            <TableRow> 
              <TableCell component="th" scope="row" className={classes.tableCell}>
            Your Car
              </TableCell>
              <TableCell className={classes.tableCell}>{car_make}</TableCell>
            </TableRow> 

            <TableRow> 
            <TableCell component="th" scope="row" className={classes.tableCell}>
              Car Year
              </TableCell>
              <TableCell className={classes.tableCell}>{year}</TableCell>
            </TableRow>  

            <TableRow> 
            <TableCell component="th" scope="row" className={classes.tableCell}>
              Your Location
              </TableCell>
              <TableCell className={classes.tableCell}>{location}</TableCell>
            </TableRow>

            <TableRow> 
            <TableCell component="th" scope="row" className={classes.tableCell}>
            Your Problem
              </TableCell>
              <TableCell className={classes.tableCell}>{description_of_problem}</TableCell>
            </TableRow> 

            {isConfirmed && <TableRow> 
            <TableCell component="th" scope="row" className={classes.tableCell}>
            Confirmed
              </TableCell>
              <TableCell className={classes.tableCell}>Your request is confirmed</TableCell>
            </TableRow>} 

            {isCompleted && <TableRow> 
            <TableCell component="th" scope="row" className={classes.tableCell}>
            Completed
              </TableCell>
              <TableCell className={classes.tableCell}>Your mechanic is all done</TableCell>
            </TableRow>} 
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
  
ConfirmTable.propTypes = {
  inspection: PropTypes.object.isRequired,
  car_make: PropTypes.string,
  year: PropTypes.number,
  location: PropTypes.string,
  description_of_problem: PropTypes.string,
  isCompleted: PropTypes.bool,
  isConfirmed: PropTypes.bool,
  mechanic: PropTypes.object.isRequired,
  first_name: PropTypes.string,
  last_name: PropTypes.string
};