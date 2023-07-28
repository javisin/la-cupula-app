import { createBrowserRouter, redirect } from 'react-router-dom';
import React from 'react';
import { getCurrentUser } from '../util/auth';
import SignUpPage from '../pages/sign-up';
import LoginPage from '../pages/login';
import HomePage from '../pages/home';

const checkIsLoggedIn = () => {
  const user = getCurrentUser();
  if (!user) {
    return redirect('/login');
  }
  return null;
};

const checkIsNotLoggedIin = () => {
  const user = getCurrentUser();
  if (user) {
    return redirect('/home');
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    loader: checkIsLoggedIn,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
    loader: checkIsNotLoggedIin,
  },
  {
    path: '/login',
    element: <LoginPage />,
    loader: checkIsNotLoggedIin,
  },
  {
    path: '/home',
    element: <HomePage />,
    loader: checkIsLoggedIn,
  },
]);
export default router;
