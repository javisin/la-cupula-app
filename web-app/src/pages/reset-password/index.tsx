import React, { ChangeEvent, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  CircularProgress,
  Paper,
  Alert,
} from '@mui/material';
import { useResetPassword } from '../../hooks/api/auth';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token') ?? '';
  const mutation = useResetPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ token, password });
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  if (mutation.isSuccess) {
    return (
      <Box maxWidth={400} mx="auto" my={4}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Stack spacing={3} alignItems="center">
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60 }} />
            <Typography variant="h5" align="center" gutterBottom>
              ¡Contraseña actualizada!
            </Typography>
            <Typography align="center" color="text.secondary">
              Tu contraseña ha sido cambiada. Ahora puedes iniciar sesión con tu nueva
              contraseña.
            </Typography>
            <Button variant="contained" size="large" onClick={handleGoToLogin} sx={{ mt: 2 }}>
              Ir a inicio de sesión
            </Button>
          </Stack>
        </Paper>
      </Box>
    );
  }

  return (
    <Box maxWidth={400} mx="auto" my={4}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Nueva contraseña
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
          Asigna tu nueva contraseña para continuar
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              name="password"
              type="password"
              label="Contraseña"
              size="medium"
              fullWidth
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              error={mutation.isError}
              helperText="La contraseña debe tener al menos 8 caracteres"
            />
            <Button
              disabled={mutation.isLoading || !password}
              type="submit"
              variant="contained"
              size="large"
            >
              {mutation.isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Cambiar contraseña'
              )}
            </Button>
            {mutation.isError && (
              <Alert severity="error" icon={<ErrorOutlineIcon />}>
                No se pudo cambiar la contraseña. Por favor, intenta nuevamente o solicita un nuevo
                enlace.
              </Alert>
            )}
          </Stack>
        </form>
        <Typography align="center" mt={3}>
          <Link to="/login">Volver a inicio de sesión</Link>
        </Typography>
      </Paper>
    </Box>
  );
}
