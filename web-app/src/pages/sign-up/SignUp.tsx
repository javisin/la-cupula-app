import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {Box, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";

const Form = () => {
  const [belt, setBelt] = useState('white');
  const [stripes, setStripes] = useState('0');
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };


  return (
    <Box maxWidth={300} mx="auto" my={2}>
      <Typography variant="h5" align="center" gutterBottom>
        Registro de alumno
      </Typography>
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField size="small" label="Nombre" variant="outlined" fullWidth />
        <TextField size="small" label="Apellidos" variant="outlined" fullWidth />
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
        <TextField size="small" label="Email" type="email" variant="outlined" fullWidth />
        <TextField size="small" label="Contraseña" type="password" variant="outlined" fullWidth />

        <TextField
          id="start-date"
          label="Fecha de comienzo"
          type="date"
          variant="outlined"
          size={"small"}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Button type="submit" variant="contained" color="primary">
          Registrarse
        </Button>
      </Stack>
    </form>
    </Box>
  );
};

export default Form;
