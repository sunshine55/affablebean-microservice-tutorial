import React from 'react';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const Header = ({cart}) => {
  const keys = Object.keys(cart);
  let sumQty = 0;
  let sumTotal = 0;
  if (keys.length !== 0) {
    sumQty = keys.map(k => cart[k]['qty']).reduce((sum, qty) => sum + qty);
    sumTotal = keys.map(k => cart[k]['total']).reduce((sum, total) => sum + total);
  }
  return (
    <Box sx={{height: '15vh', m: '10px 0px'}}>
      <Typography variant="h3" gutterBottom>Affable Spring Bean!</Typography>
      <Typography variant="body1" gutterBottom>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
      <Stack direction="row-reverse" alignItems="center" sx={{m: 2}}>
        <Badge badgeContent={sumQty} color="warning" anchorOrigin={{vertical: 'top', horizontal: 'left'}}>
          <Button variant="outlined" startIcon={<ShoppingCartIcon/>}>Total: {sumTotal}</Button>
        </Badge>
      </Stack>
    </Box>
  );
};