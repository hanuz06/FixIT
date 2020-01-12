import React from 'react';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import PropTypes from 'prop-types';

export default function RatingSize({ setStars, stars }) {
  
  const setMechanicRating = (e, newValue) => {
    e.stopPropagation();     
    setStars(newValue)
  }

  return (
    <Box display="flex" >      
      <Rating name="simple-controlled" value={stars} size="large" onChange={setMechanicRating} style={{cursor: 'pointer'}} precision={0.5}/>
    </Box>
  )};

  RatingSize.propTypes = {
    stars: PropTypes.number,
    setStars: PropTypes.func.isRequired
  };