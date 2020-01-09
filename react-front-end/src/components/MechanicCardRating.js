import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';

export default function MechanicCardRating({ stars }) {
 
 
    stars = null || Number(stars).toFixed(1);
 

  return (
    <Box display="flex" style={{justifyContent:'space-between', alignItems:'center', padding: '5px 10px', width: '100%'}} >      
      <Rating name="read-only" style={{color:'#fcce03', opacity:1}} value={ stars } onClick={(e)=>e.preventDefault} size="large" precision={0.5} disabled/>
      <Typography>
      {stars}
      </Typography>
    </Box>
  )};