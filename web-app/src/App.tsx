import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/sign-up/SignUp';
import { createTheme, ThemeProvider } from '@mui/material';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './pages/login/Login';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
  },
});

if (process.env.NODE_ENV !== 'production') {
  axios.defaults.baseURL = 'http://localhost:3001';
}

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
