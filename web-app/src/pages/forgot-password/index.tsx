import React, { ChangeEvent, useState } from 'react';
import { Box, TextField, Button, Typography, Stack, CircularProgress } from '@mui/material';
import { useRequestPasswordReset } from '../../hooks/api/auth';

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
          {mutation.isSuccess && (
            <Typography align="center">Si la cuenta existe se enviará un correo</Typography>
          )}
        </Stack>
      </form>
    </Box>
  );
}
