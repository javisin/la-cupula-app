import { createBrowserRouter, redirect } from 'react-router-dom';
import React from 'react';
import { getCurrentUser } from '../util/auth';
import SignUpPage from '../pages/sign-up';
import LoginPage from '../pages/login';
import HomePage from '../pages/home';
import TabRouter from '../components/TabRouter';
import ProfilePage from '../pages/profile';

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
    element: (
      <TabRouter>
        <HomePage />
      </TabRouter>
    ),
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
    element: (
      <TabRouter>
        <HomePage />
      </TabRouter>
    ),
    loader: checkIsLoggedIn,
  },
  {
    path: '/profile',
    element: (
      <TabRouter>
        <ProfilePage />
      </TabRouter>
    ),
    loader: checkIsLoggedIn,
  },
]);
export default router;
