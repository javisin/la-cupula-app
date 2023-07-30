import React from 'react';
import { Avatar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { getCurrentUser, logout } from '../../util/auth';
import { useGetUser } from '../../hooks/api/user';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const currentUser = getCurrentUser();
  const getUserQuery = useGetUser(parseInt(currentUser?.sub ?? '1'));
  const user = getUserQuery.data;
  const beltImage = user?.belt ?? 'black';

  const image = user?.belt ? require(`../../assets/images/${beltImage}_Belt.png`) : undefined;
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    navigate('/login');
    logout();
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}
    >
      <Avatar
        alt={user.firstName}
        src={user.image}
        sx={{ width: 120, height: 120, marginBottom: '10px' }}
      />
      <Typography variant="h5" component="h2" gutterBottom>
        {`${user.firstName} ${user.lastName}`}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Entrenando desde: {new Date(user.startDate).toLocaleDateString()}
      </Typography>
      <img src={image} style={{ width: '200px', height: '200px', margin: '10px' }} alt="belt" />
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Cerrar sesión
      </Button>
    </div>
  );
}
