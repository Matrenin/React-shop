import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

const StarRating = ({ rating, selectRating }) => {

  const setRating = value => {
    selectRating(value)
  }

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Rating name="size-large" size="large"
        // name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />
    </Box>
  );
}

export default StarRating