import React, { Fragment, useEffect } from 'react';
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

const uName = sessionStorage.getItem('uName')

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  table: {
    width: '100%',  
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
  const classes = useStyles();  

  const [open, setOpen] = React.useState(false);  
   
  useEffect(() => {
   
      onlyOnce()      

  } ,[]);
  const onlyOnce = function () {

    if (inspection.isConfirmed) {
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

    <div >      
      <Snackbar open={open} onClose={handleClose}>
        <Alert onClose={handleClose} color="success">
          This is a success message!
        </Alert>
      </Snackbar>      
    </div>

    <TableContainer component={Paper} style={{"overflowX":"auto"}}>
      <Table className={classes.table} aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell} style={{ 'width':'150px'}}>Description</TableCell>
            <TableCell className={classes.tableCell}>Values</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>          
          <TableRow>  
            <TableCell component="th" scope="row" className={classes.tableCell}>
            Mechanic name
            </TableCell>
            <TableCell className={classes.tableCell}>{mechanic.first_name} {mechanic.last_name}</TableCell>
          </TableRow> 

          <TableRow> 
            <TableCell component="th" scope="row" className={classes.tableCell}>
            Car make&model
            </TableCell>
            <TableCell className={classes.tableCell}>{inspection.car_make}</TableCell>
          </TableRow> 

          <TableRow> 
          <TableCell component="th" scope="row" className={classes.tableCell}>
            Year
            </TableCell>
            <TableCell className={classes.tableCell}>{inspection.year}</TableCell>
          </TableRow>  

          <TableRow> 
          <TableCell component="th" scope="row" className={classes.tableCell}>
            Location
            </TableCell>
            <TableCell className={classes.tableCell}>{inspection.location}</TableCell>
          </TableRow>

          <TableRow> 
          <TableCell component="th" scope="row" className={classes.tableCell}>
          Description_of_problem
            </TableCell>
            <TableCell className={classes.tableCell}>{inspection.description_of_problem}</TableCell>
          </TableRow> 

          {inspection.isConfirmed && <TableRow> 
          <TableCell component="th" scope="row" className={classes.tableCell}>
          Confirmed
            </TableCell>
            <TableCell className={classes.tableCell}>Your request is confirmed</TableCell>
          </TableRow>} 

          {inspection.isCompleted && <TableRow> 
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
