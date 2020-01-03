import React from 'react';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

export default function RatingSize() {

  const starRating = (event) => {
    event.stopPropagation();
    console.log("This is a mechanic rating")    
  }

  return (
    <Box display="flex" >
      {/* <Rating name="size-small" value={2} size="small" />
      <Rating name="size-medium" value={2} /> */}
      <Rating name="size-large" value={4} size="large" onClick={starRating} style={{cursor: 'pointer'}}/>
    </Box>
  )};