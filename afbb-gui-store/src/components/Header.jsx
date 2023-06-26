import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const Header = () => (
  <Box sx={{height: '15vh', m: '10px'}}>
    <Typography variant="h3" gutterBottom>Affable Spring Bean!</Typography>
    <Typography variant="body1" gutterBottom>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
  </Box>
);