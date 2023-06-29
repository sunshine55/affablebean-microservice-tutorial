import React from 'react';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const Header = ({cart}) => {
  const qty = !cart ? 5 : Object.keys(cart).reduce((sum, key) => sum + cart[key]);
  return (
    <Box sx={{height: '15vh', m: '10px 0px'}}>
      <Typography variant="h3" gutterBottom>Affable Spring Bean!</Typography>
      <Typography variant="body1" gutterBottom>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
      <Stack direction="row-reverse" spacing={2}>
        <Badge badgeContent={qty} color="warning" anchorOrigin={{vertical: 'top', horizontal: 'left'}}>
          <Button variant="outlined" startIcon={<ShoppingCartIcon/>}>Cart</Button>
        </Badge>
      </Stack>
      
    </Box>
  )
};