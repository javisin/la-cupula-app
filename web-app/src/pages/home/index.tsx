import React from 'react';
import { Box } from '@mui/material';
import { getCurrentUser, logout } from '../../util/auth';
import { useGetUser } from '../../hooks/api/user';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const jwtUser = getCurrentUser();
  const getUserQuery = useGetUser(parseInt(jwtUser!.sub));
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box maxWidth={300} mx="auto" my={2}>
      <h1>hola {getUserQuery.data.firstName}</h1>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        cerrar sesion
      </Button>
    </Box>
  );
}
