import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import { createRoot } from 'react-dom/client';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

const App = () => (
  <ThemeProvider theme={darkTheme}>
    <Container fixed>
      <Box sx={{bgcolor: '#cfe8fc', height: '25vh'}}/>
      <Box sx={{bgcolor: '#aaa', height: '60vh', display: 'flex'}}>
        <Box sx={{bgcolor: '#bbb', flexGrow: 1}}/>
        <Box sx={{bgcolor: '#eee', flexGrow: 2}}/>
      </Box>
      <Box sx={{bgcolor: '#cff8fc', height: '10vh'}}/>
    </Container>
  </ThemeProvider>
);

const el = document.getElementById('root');
const root = createRoot(el);
root.render(<App />);
