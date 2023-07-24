import React, { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import axios from 'axios';

const Form = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [belt, setBelt] = useState('white');
  const [stripes, setStripes] = useState('0');
  const [startDate, setStartDate] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files?.[0] ?? null);
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('belt', belt);
      formData.append('stripes', stripes);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('startDate', startDate);
      formData.append('image', selectedFile || '');

      const response = await axios.post('http://localhost:3001/api/auth/sign-up', formData);

      console.log('Form submitted successfully!', response.data);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <Box maxWidth={300} mx="auto" my={2}>
      <Typography variant="h5" align="center" gutterBottom>
        Registro de alumno
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            size="small"
            label="Nombre"
            variant="outlined"
            fullWidth
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            // helperText={true ? 'First name is required' : ''}
          />
          <TextField
            size="small"
            label="Apellidos"
            variant="outlined"
            fullWidth
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="belt-select">Cinturón</InputLabel>
            <Select
              label="Cinturón"
              id="belt-select"
              value={belt}
              onChange={(event) => setBelt(event.target.value)}
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
              value={stripes}
              onChange={(event) => setStripes(event.target.value)}
            >
              <MenuItem value="0">0</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
            </Select>
          </FormControl>
          <TextField
            onChange={(event) => setEmail(event.target.value)}
            size="small"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
          />
          <TextField
            size="small"
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />

          <TextField
            id="start-date"
            label="Fecha de comienzo"
            type="date"
            variant="outlined"
            size={'small'}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => setStartDate(event.target.value)}
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

          <Button disabled={false} type="submit" variant="contained" color="primary">
            Registrarse
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Form;
