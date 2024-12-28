import React, { useState } from 'react';
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
import { useUpdateLesson } from '../../hooks/api/lesson';
import { useGetUsers } from '../../hooks/api/user';
import { convertDateToDateString } from '../../util/dates';

interface UpdateLessonModalProps {
  lessonId: number;
  isOpen: boolean;
  close: () => void;
  initialValues: {
    date: string;
    startTime: string;
    endTime: string;
    type: string;
    professorId: number;
  };
}

export default function UpdateLessonModal({
  close,
  isOpen,
  initialValues,
  lessonId,
}: UpdateLessonModalProps) {
  const [date, setDate] = useState(convertDateToDateString(new Date(initialValues.date)));
  const [startTime, setStartTime] = useState(initialValues.startTime);
  const [endTime, setEndTime] = useState(initialValues.endTime);
  const [type, setType] = useState(initialValues.type);
  const [professorId, setProfessorId] = useState(initialValues.professorId);
  const { data: users } = useGetUsers({ instructor: true });
  const updateLessonMutation = useUpdateLesson();

  const handleSubmit = () => {
    const startDateTime = new Date(`${date}T${startTime}`);
    const endDateTime = new Date(`${date}T${endTime}`);
    updateLessonMutation.mutate({
      id: lessonId,
      changeset: {
        type: type !== initialValues.type ? type : undefined,
        startDate: startTime !== initialValues.startTime ? startDateTime.toISOString() : undefined,
        endDate: endTime !== initialValues.endTime ? endDateTime.toISOString() : undefined,
        professorId: professorId !== initialValues.professorId ? professorId : undefined,
      },
    });
    close();
  };
  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>Editar clase</DialogTitle>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancelar</Button>
        <Button onClick={handleSubmit}>Guardar cambios</Button>
      </DialogActions>
    </Dialog>
  );
}
