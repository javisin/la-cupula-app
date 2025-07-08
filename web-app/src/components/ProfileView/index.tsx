import React from 'react';
import {
  Avatar,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import Button from '@mui/material/Button';
import { logout, getCurrentUser } from '../../util/auth';
import { User, useUpdateUser, useUpdateUserImage } from '../../hooks/api/user';
import { useNavigate } from 'react-router-dom';
import { formatDateToMonthAndYear } from '../../util/dates';
import { useGetPlans } from '../../hooks/api/plan';
import EditIcon from '@mui/icons-material/Edit';

interface ProfileViewProps {
  user: User;
  canLogout?: boolean;
}

export default function ProfileView({ user, canLogout }: ProfileViewProps) {
  const getPlansQuery = useGetPlans();
  const plans = getPlansQuery.data;
  const userPlan = plans?.find((plan) => plan.id === user?.plan?.id);
  const beltImage = user?.belt ?? 'white';

  const currentUser = getCurrentUser();
  const updateUserMutation = useUpdateUser();
  const updateUserImageMutation = useUpdateUserImage();

  // Add a state to force image refresh
  const [imageRefreshKey, setImageRefreshKey] = React.useState(0);

  const handleBeltChange = (event: SelectChangeEvent) => {
    updateUserMutation.mutate({
      id: user.id,
      changeset: { belt: event.target.value as string },
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      updateUserImageMutation.mutate(
        {
          id: user.id,
          image: event.target.files[0],
        },
        {
          onSuccess: () => {
            setImageRefreshKey((k) => k + 1);
          },
        },
      );
    }
  };

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
      <div style={{ position: 'relative', display: 'inline-block', marginBottom: '10px' }}>
        <Avatar
          alt={user.firstName}
          src={user.image ? `${user.image}?refresh=${imageRefreshKey}` : undefined}
          sx={{ width: 120, height: 120, fontSize: 40 }}
        />
        {currentUser?.sub === user.id.toString() && (
          <label htmlFor="profile-image-upload">
            <input
              id="profile-image-upload"
              hidden
              accept="image/*"
              type="file"
              onChange={handleImageChange}
              tabIndex={0}
            />
            <Button
              variant="outlined"
              size="small"
              component="span"
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                minWidth: 0,
                padding: '4px 8px',
                borderRadius: '50px',
                background: 'rgba(255,255,255,0.85)',
                boxShadow: 1,
                fontSize: 12,
                zIndex: 2,
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Cambiar foto"
              title="Cambiar foto"
            >
              <EditIcon fontSize="small" />
            </Button>
          </label>
        )}
      </div>
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
      {currentUser?.instructor && (
        <FormControl size="small" sx={{ marginBottom: '10px' }}>
          <InputLabel id="belt-select-label">Cinturón</InputLabel>
          <Select
            labelId="belt-select-label"
            value={user.belt}
            label="Cinturón"
            onChange={handleBeltChange}
          >
            <MenuItem value="white">Blanco</MenuItem>
            <MenuItem value="blue">Azul</MenuItem>
            <MenuItem value="purple">Morado</MenuItem>
            <MenuItem value="brown">Marrón</MenuItem>
            <MenuItem value="black">Negro</MenuItem>
          </Select>
        </FormControl>
      )}
      {canLogout && (
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      )}
    </div>
  );
}
