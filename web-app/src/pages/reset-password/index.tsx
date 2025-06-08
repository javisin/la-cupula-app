import React, { ChangeEvent, useState } from 'react';
import { Box, TextField, Button, Typography, Stack, CircularProgress } from '@mui/material';
import { useResetPassword } from '../../hooks/api/auth';
import { useSearchParams } from 'react-router-dom';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const mutation = useResetPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ token, password });
  };

  return (
    <Box maxWidth={300} mx="auto" my={2}>
      <Typography variant="h5" align="center" gutterBottom>
        Nueva contraseña
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            name="password"
            type="password"
            label="Contraseña"
            size="small"
            fullWidth
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
          <Button disabled={mutation.isLoading} type="submit" variant="contained">
            {mutation.isLoading ? <CircularProgress size={24} /> : 'Cambiar contraseña'}
          </Button>
          {mutation.isSuccess && (
            <Typography align="center">Contraseña cambiada correctamente</Typography>
          )}
          {mutation.isError && (
            <Typography align="center" color="error">
              No se pudo cambiar la contraseña
            </Typography>
          )}
        </Stack>
      </form>
    </Box>
  );
}
