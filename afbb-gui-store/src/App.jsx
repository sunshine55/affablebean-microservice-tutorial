import React, {useState} from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Body } from './components/Body';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});

const App = () => {
  const [cart, setCart] = useState({});

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Container maxWidth="lg">
        <Header cart={cart}/>
        <Body cart={cart} onCartChange={setCart}/>
        <Footer/>
      </Container>
    </ThemeProvider>
  );
};

const el = document.getElementById('root');
const root = createRoot(el);
root.render(<App />);
