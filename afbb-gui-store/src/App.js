import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const App = () => (
  <Grid container>
    <Grid item xs={6}>
      <ThemeProvider theme={darkTheme}>
        <Box
          sx={{
            p: 2,
            bgcolor: 'background.default',
            display: 'grid',
            gridTemplateColumns: { md: '1fr 1fr' },
            gap: 2,
          }}
        >
          {[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((elevation) => (
            <Item key={elevation} elevation={elevation}>
              {`elevation=${elevation}`}
            </Item>
          ))}
        </Box>
      </ThemeProvider>
    </Grid>
  </Grid>
);

const el = document.getElementById('root');
const root = createRoot(el);
root.render(<App />);
