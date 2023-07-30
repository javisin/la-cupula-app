import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import { Booking, useCreateBooking } from '../../hooks/api/booking';
import { Lesson } from '../../hooks/api/lesson';
import './home.scss';
import { convertDateToTimeString } from '../../util/dates';

interface LessonCardProps {
  lesson: Lesson;
  bookings: Booking[];
  isBooked: boolean;
}

export default function LessonCard({ lesson, isBooked, bookings }: LessonCardProps) {
  const createBookingMutation = useCreateBooking();
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);

  const handleLessonTimeClick = (id: number, date: string) => {
    createBookingMutation.mutate({ lessonId: id });
    alert(`Has reservado la clase a las ${date}.`);
  };

  return (
    <Card className="lesson-card">
      <CardContent>
        <Typography variant="h5" component="h2">
          {`${convertDateToTimeString(new Date(lesson.startDate))} -
                  ${convertDateToTimeString(new Date(lesson.endDate))}`}
        </Typography>
        <Typography fontWeight="bold" color="primary">
          {lesson.type}
        </Typography>
        <Button
          key={lesson.id}
          variant="contained"
          color="primary"
          onClick={() =>
            handleLessonTimeClick(lesson.id, convertDateToTimeString(new Date(lesson.startDate)))
          }
          className="lesson-time-button"
          disabled={isBooked}
        >
          {isBooked ? 'Reservada' : 'Reservar clase'}
        </Button>
        <Typography
          className="participants-button"
          color="primary"
          onClick={() => setIsParticipantsModalOpen(true)}
        >
          {`Ver participantes (${bookings.length})`}
        </Typography>
      </CardContent>

      <Dialog open={isParticipantsModalOpen} onClose={() => setIsParticipantsModalOpen(false)}>
        <DialogTitle>Lista de participantes</DialogTitle>
        <DialogContent>
          <List>
            {bookings.map((booking) => (
              <ListItem key={booking.userId}>
                <ListItemText primary={`${booking.user.firstName} ${booking.user.lastName}`} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsParticipantsModalOpen(false)} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
