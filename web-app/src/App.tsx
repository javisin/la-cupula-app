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
  typography: {
    fontFamily: '"Bebas Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    h1: {
      fontFamily: '"Bebas Neue", sans-serif',
    },
    h2: {
      fontFamily: '"Bebas Neue", sans-serif',
    },
    h3: {
      fontFamily: '"Bebas Neue", sans-serif',
    },
    h4: {
      fontFamily: '"Bebas Neue", sans-serif',
    },
    h5: {
      fontFamily: '"Bebas Neue", sans-serif',
    },
    h6: {
      fontFamily: '"Bebas Neue", sans-serif',
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
