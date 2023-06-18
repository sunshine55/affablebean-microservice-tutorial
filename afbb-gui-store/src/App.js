import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import { createRoot } from 'react-dom/client';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

const App = () => (
  <ThemeProvider theme={darkTheme}>
    <Container fixed>
      <Box sx={{bgcolor: '#cfe8fc', height: '95vh'}}/>
    </Container>
  </ThemeProvider>
);

const el = document.getElementById('root');
const root = createRoot(el);
root.render(<App />);
