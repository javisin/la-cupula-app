import React from 'react';
import { Avatar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { logout } from '../../util/auth';
import { User } from '../../hooks/api/user';
import { useNavigate } from 'react-router-dom';
import { formatDateToMonthAndYear } from '../../util/dates';
import { useGetPlans } from '../../hooks/api/plan';

interface ProfileViewProps {
  user: User;
  canLogout?: boolean;
}

export default function ProfileView({ user, canLogout }: ProfileViewProps) {
  const getPlansQuery = useGetPlans();
  const plans = getPlansQuery.data;
  const userPlan = plans?.find((plan) => plan.id === user?.plan?.id);
  const beltImage = user?.belt ?? 'white';

  const image = user?.belt ? require(`../../assets/images/${beltImage}_Belt.png`) : undefined;
  const navigate = useNavigate();

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
        Entrenando desde: {formatDateToMonthAndYear(new Date(user.startDate))}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Asistencias desde el pago: {user.planBookings} / {userPlan?.lessons ?? 0}
      </Typography>
      {user.totalBookings && (
        <Typography variant="subtitle1" gutterBottom>
          Asistencias totales: {user.totalBookings}
        </Typography>
      )}
      <img src={image} style={{ width: '200px', height: '200px', margin: '10px' }} alt="belt" />
      {canLogout && (
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      )}
    </div>
  );
}
