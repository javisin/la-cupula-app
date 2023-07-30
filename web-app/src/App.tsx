import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRouter from './routes';
import { RouterProvider } from 'react-router-dom';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={AppRouter} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
