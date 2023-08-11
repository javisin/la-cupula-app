import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Booking, useCreateBooking, useDeleteBooking } from '../../hooks/api/booking';
import { Lesson } from '../../hooks/api/lesson';
import './home.scss';
import { convertDateToTimeString } from '../../util/dates';
import ParticipantsList from './ParticipantsList';

interface LessonCardProps {
  lesson: Lesson;
  bookings: Booking[];
  userBooking?: Booking;
}

export default function LessonCard({ lesson, userBooking, bookings }: LessonCardProps) {
  const createBookingMutation = useCreateBooking();
  const deleteBookingMutation = useDeleteBooking();
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);

  const createBooking = (lessonId: number, date: string) => {
    createBookingMutation.mutate({ lessonId });
    alert(`Has reservado la clase a las ${date}.`);
  };

  const deleteBooking = (bookingId: number, date: string) => {
    console.log('vamoo');
    deleteBookingMutation.mutate({ bookingId });
    alert(`Has cancelado la clase de las ${date}.`);
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
          color={userBooking ? 'error' : 'primary'}
          onClick={() => {
            const timeString = convertDateToTimeString(new Date(lesson.startDate));
            if (userBooking) {
              deleteBooking(userBooking.id!, timeString);
            } else {
              createBooking(lesson.id, timeString);
            }
          }}
          className="lesson-time-button"
        >
          {userBooking ? 'Cancelar clase' : 'Reservar clase'}
        </Button>
        <Typography
          className="participants-button"
          color="primary"
          onClick={() => setIsParticipantsModalOpen(true)}
        >
          {`Ver participantes (${bookings.length})`}
        </Typography>
      </CardContent>

      <ParticipantsList
        bookings={bookings}
        isOpen={isParticipantsModalOpen}
        closeModal={() => setIsParticipantsModalOpen(false)}
      />
    </Card>
  );
}
