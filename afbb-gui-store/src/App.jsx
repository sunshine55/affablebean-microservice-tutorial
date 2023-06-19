import React from 'react';
import { createRoot } from 'react-dom/client';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Footer } from './components/Footer';

const App = () => (
  <Container maxWidth="lg">
    <Box sx={{ bgcolor: '#cfe8fc', height: '25vh' }} />
    <Box sx={{ bgcolor: '#aaa', height: '60vh', display: 'flex' }}>
      <Box sx={{ bgcolor: '#bbb', flexGrow: 1 }} />
      <Box sx={{ bgcolor: '#eee', flexGrow: 2 }} />
    </Box>
    <Box sx={{ height: '10vh' }}><Footer/></Box>
  </Container>
);

const el = document.getElementById('root');
const root = createRoot(el);
root.render(<App />);
