import React, { ChangeEvent, useState } from 'react';
import { Box, TextField, Button, Typography, Stack, CircularProgress } from '@mui/material';
import { useRequestPasswordReset } from '../../hooks/api/auth';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const mutation = useRequestPasswordReset();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ email });
  };

  return (
    <Box maxWidth={300} mx="auto" my={2}>
      <Typography variant="h5" align="center" gutterBottom>
        Restablecer contraseña
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            name="email"
            type="email"
            label="Email"
            size="small"
            fullWidth
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <Button disabled={mutation.isLoading} type="submit" variant="contained">
            {mutation.isLoading ? <CircularProgress size={24} /> : 'Enviar'}
          </Button>
          <Typography align="center">
            <Link to="/login">Volver a inicio de sesión</Link>
          </Typography>
          {mutation.isSuccess && (
            <Typography align="center">
              Si la cuenta existe se enviará un correo con instrucciones para restablecer la
              contraseña
            </Typography>
          )}
        </Stack>
      </form>
    </Box>
  );
}
