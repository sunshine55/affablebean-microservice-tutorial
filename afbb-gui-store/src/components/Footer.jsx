import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export const Footer = () => (
  <Typography variant="body1" align="center" sx={{margin: '10px'}}>
    &copy; Developed by <Link href="https://github.com/sunshine55?tab=repositories">sunshine55</Link>
  </Typography>
);