import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const Footer = () => (
  <Box sx={{height: '10vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <Typography variant="body1" sx={{m: '10px'}}>
      &copy; Developed by <Link href="https://github.com/sunshine55?tab=repositories">sunshine55</Link>
    </Typography>
  </Box>
);