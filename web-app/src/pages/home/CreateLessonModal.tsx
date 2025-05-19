import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useCreateLesson } from '../../hooks/api/lesson';
import { useGetUsers } from '../../hooks/api/user';
import { useGetAcademies } from '../../hooks/api/academy';

interface CreateLessonModalProps {
  isOpen: boolean;
  close: () => void;
}

const DEFAULT_PROFESSOR_ID = 5;

export default function CreateLessonModal({ close, isOpen }: CreateLessonModalProps) {
  const [date, setDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [maxSeats, setMaxSeats] = useState<string>('30');
  const [type, setType] = useState<string>('');
  const [professorId, setProfessorId] = useState<number>(DEFAULT_PROFESSOR_ID);
  const [academyId, setAcademyId] = useState<number>();
  const createLessonMutation = useCreateLesson();
  const { data: users } = useGetUsers({ instructor: true });
  const { data: academies } = useGetAcademies();

  useEffect(() => {
    if (academies?.[0]) {
      setAcademyId(academies[0].id);
    }
  }, [academies]);

  const handleSubmit = () => {
    const startDateTime = new Date(`${date}T${startTime}`);
    const endDateTime = new Date(`${date}T${endTime}`);
    createLessonMutation.mutate({
      type,
      startDate: startDateTime.toISOString(),
      endDate: endDateTime.toISOString(),
      professorId,
      maxSeats: Number(maxSeats),
      academyId: academyId!,
    });
    close();
  };
  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>Añadir una clase</DialogTitle>
      <DialogContent>
        <TextField
          label="Fecha"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          label="Hora comienzo"
          type="time"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <TextField
          label="Hora fin"
          type="time"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <TextField
          label="Plazas"
          type="number"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={maxSeats}
          onChange={(e) => setMaxSeats(e.target.value)}
        />
        <TextField
          label="Tipo"
          type="text"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="professor-label">Profesor</InputLabel>
          <Select
            label={'Profesor'}
            labelId={'professor-label'}
            value={professorId}
            onChange={(event) => {
              setProfessorId(Number(event.target.value));
            }}
          >
            {users?.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {`${user.firstName} ${user.lastName}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="academy-label">Academia</InputLabel>
          <Select
            label={'Academia'}
            labelId={'academy-label'}
            value={academyId}
            onChange={(event) => {
              setAcademyId(Number(event.target.value));
            }}
          >
            {academies?.map((academy) => (
              <MenuItem key={academy.id} value={academy.id}>
                {academy.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancelar</Button>
        <Button onClick={handleSubmit}>Añadir</Button>
      </DialogActions>
    </Dialog>
  );
}
