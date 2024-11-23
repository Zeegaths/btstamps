import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App';


const theme = extendTheme({
  // Optional: add custom theme configurations
});

createRoot(document.getElementById('root')).render(


    <StrictMode>
      <ChakraProvider theme={theme}>
      <App />
      </ChakraProvider>    
    </StrictMode>


  
);
