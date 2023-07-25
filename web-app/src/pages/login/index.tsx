import React, { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useLogin } from '../../hooks/api/auth';

export default function LoginPage() {
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  });
  const loginMutation = useLogin();

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    loginMutation.mutate(formFields);
  };

  return (
    <Box maxWidth={300} mx="auto" my={2}>
      <Typography variant="h5" align="center" gutterBottom>
        Inicio de sesión
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            name="email"
            size="small"
            label="Email"
            variant="outlined"
            fullWidth
            value={formFields.email}
            onChange={handleFieldChange}
            // helperText={true ? 'First name is required' : ''}
          />
          <TextField
            name="password"
            size="small"
            label="Contraseña"
            variant="outlined"
            fullWidth
            value={formFields.password}
            onChange={handleFieldChange}
          />
          <Button
            disabled={loginMutation.isLoading}
            type="submit"
            variant="contained"
            color="primary"
          >
            {loginMutation.isLoading ? <CircularProgress size={24} /> : 'Iniciar sesión'}
          </Button>
          {loginMutation.isError && (
            <Typography variant="body1" color="error" align="center" sx={{ marginBottom: 2 }}>
              Credenciales inválidas. Por favor, inténtelo de nuevo.
            </Typography>
          )}
        </Stack>
      </form>
    </Box>
  );
}
