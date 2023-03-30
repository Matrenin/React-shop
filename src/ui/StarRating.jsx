import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/system';

const StyledBox = styled(Box)({
  '& .MuiRating-icon': {
    fontSize: '1.65rem',
    cursor: 'pointer',
  },
});

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