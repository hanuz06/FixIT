import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

export default function RatingSize({ setStars, stars }) {
  
  const setMechanicRating = (e, newValue) => {
    e.stopPropagation();     
    setStars(newValue)
  }

  // useEffect(() => {
  //   setStars(rating)
  // });

  return (
    <Box display="flex" >      
      <Rating name="simple-controlled" value={stars} size="large" onChange={setMechanicRating} style={{cursor: 'pointer'}} precision={0.5}/>
    </Box>
  )};