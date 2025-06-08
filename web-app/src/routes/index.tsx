import { createBrowserRouter, redirect } from 'react-router-dom';
import React from 'react';
import { getCurrentUser } from '../util/auth';
import SignUpPage from '../pages/sign-up';
import LoginPage from '../pages/login';
import HomePage from '../pages/home';
import TabRouter from '../components/TabRouter';
import ProfilePage from '../pages/profile';
import StudentsPage from '../pages/students';
import PaymentPage from '../pages/payment';
import StudentPage from '../pages/student';
import ForgotPasswordPage from '../pages/forgot-password';
import ResetPasswordPage from '../pages/reset-password';

const checkIsLoggedIn = () => {
  const user = getCurrentUser();
  if (!user) {
    return redirect('/login');
  }
  return null;
};

const checkIsAdmin = () => {
  const user = getCurrentUser();
  if (!user) {
    return redirect('/login');
  }
  if (!user.instructor) {
    return redirect('/home');
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
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
    loader: checkIsNotLoggedIin,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
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
  {
    path: '/payment',
    element: (
      <TabRouter>
        <PaymentPage />
      </TabRouter>
    ),
    loader: checkIsLoggedIn,
  },
  {
    path: '/students',
    element: (
      <TabRouter>
        <StudentsPage />
      </TabRouter>
    ),
    loader: checkIsAdmin,
  },
  {
    path: '/students/:id',
    element: (
      <TabRouter>
        <StudentPage />
      </TabRouter>
    ),
    loader: checkIsAdmin,
  },
]);
export default router;
