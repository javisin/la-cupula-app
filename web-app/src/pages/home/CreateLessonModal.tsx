import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useCreateLesson } from '../../hooks/api/lesson';

interface CreateLessonModalProps {
  isOpen: boolean;
  close: () => void;
}

export default function CreateLessonModal({ close, isOpen }: CreateLessonModalProps) {
  const [date, setDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [type, setType] = useState<string>('');
  const createLessonMutation = useCreateLesson();

  const handleSubmit = () => {
    const startDateTime = new Date(`${date}T${startTime}`);
    const endDateTime = new Date(`${date}T${endTime}`);
    createLessonMutation.mutate({
      type,
      startDate: startDateTime.toISOString(),
      endDate: endDateTime.toISOString(),
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
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancelar</Button>
        <Button onClick={handleSubmit}>Añadir</Button>
      </DialogActions>
    </Dialog>
  );
}
