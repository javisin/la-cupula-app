import React, { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useSignUp } from '../../hooks/api/auth';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const [formFields, setFormFields] = useState({
    firstName: '',
    lastName: '',
    belt: 'white',
    stripes: '0',
    email: '',
    password: '',
    startDate: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const signUpMutation = useSignUp();
  const navigate = useNavigate();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files?.[0] ?? null);
  };

  const isFormValid =
    Object.values(formFields).every((value) => value !== '') && selectedFile !== null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    signUpMutation.mutate(
      { ...formFields, image: selectedFile! },
      {
        onSuccess: () => {
          navigate('/login');
        },
        onError: () => {
          console.log('error');
        },
      },
    );
  };

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box maxWidth={300} mx="auto" my={2}>
      <Typography variant="h5" align="center" gutterBottom>
        Registro de alumno
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            name="firstName"
            size="small"
            label="Nombre"
            variant="outlined"
            fullWidth
            value={formFields.firstName}
            onChange={handleFieldChange}
            // helperText={true ? 'First name is required' : ''}
          />
          <TextField
            name="lastName"
            size="small"
            label="Apellidos"
            variant="outlined"
            fullWidth
            value={formFields.lastName}
            onChange={handleFieldChange}
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="belt-select">Cinturón</InputLabel>
            <Select
              label="Cinturón"
              id="belt-select"
              value={formFields.belt}
              onChange={(event) => {
                const { value } = event.target;
                setFormFields((prevData) => ({
                  ...prevData,
                  belt: value,
                }));
              }}
            >
              <MenuItem value="white">Blanco</MenuItem>
              <MenuItem value="blue">Azul</MenuItem>
              <MenuItem value="purple">Morado</MenuItem>
              <MenuItem value="brown">Marrón</MenuItem>
              <MenuItem value="black">Negro</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="belt-select">Grados</InputLabel>
            <Select
              label="Grados"
              id="stripes-select"
              value={formFields.stripes}
              onChange={(event) => {
                const { value } = event.target;
                setFormFields((prevData) => ({
                  ...prevData,
                  stripes: value,
                }));
              }}
            >
              <MenuItem value="0">0</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="email"
            onChange={handleFieldChange}
            size="small"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={formFields.email}
          />
          <TextField
            name="password"
            size="small"
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            onChange={handleFieldChange}
            value={formFields.password}
          />

          <TextField
            id="start-date"
            name="startDate"
            label="Fecha de comienzo"
            type="date"
            variant="outlined"
            size={'small'}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleFieldChange}
          />

          <input
            accept="image/*"
            type="file"
            id="image-upload"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <label htmlFor="image-upload">
            <Button variant="contained" color="primary" component="span" fullWidth>
              Foto de perfil
            </Button>
          </label>
          {selectedFile && <Typography>{selectedFile.name}</Typography>}

          <Button
            disabled={!isFormValid || signUpMutation.isLoading}
            type="submit"
            variant="contained"
            color="primary"
          >
            {signUpMutation.isLoading ? <CircularProgress size={24} /> : 'Registrarse'}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
