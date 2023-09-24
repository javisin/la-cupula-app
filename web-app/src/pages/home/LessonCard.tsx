import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Booking, useCreateBooking, useDeleteBooking } from '../../hooks/api/booking';
import { Lesson, useDeleteLessons } from '../../hooks/api/lesson';
import './home.scss';
import { convertDateToTimeString } from '../../util/dates';
import ParticipantsList from './ParticipantsList';
import { getCurrentUser } from '../../util/auth';
import { useGetUser } from '../../hooks/api/user';

interface LessonCardProps {
  lesson: Lesson;
  bookings: Booking[];
  userBooking?: Booking;
}

export default function LessonCard({ lesson, userBooking, bookings }: LessonCardProps) {
  const user = getCurrentUser();
  const currentUserId = parseInt(user!.sub);
  const userData = useGetUser(currentUserId);

  const createBookingMutation = useCreateBooking();
  const deleteBookingMutation = useDeleteBooking();
  const deleteLessonMutation = useDeleteLessons();
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);

  const isPastLesson = new Date() > new Date(lesson.startDate);
  const createBooking = (lessonId: number, date: string) => {
    if (!userData.data?.plan) {
      alert(
        `Lo sentimos, actualmente no cuentas con más clases en tu plan. Para seguir reservando ve a la página de pago y no te pierdas ningún entrenamiento`,
      );
      return;
    }
    createBookingMutation.mutate({ lessonId, userId: currentUserId });
    alert(`Has reservado la clase a las ${date}.`);
  };

  const deleteBooking = (bookingId: number, date: string) => {
    deleteBookingMutation.mutate({ bookingId });
    alert(`Has cancelado la reserva de las ${date}.`);
  };

  const deleteLesson = (lessonId: number, date: string) => {
    deleteLessonMutation.mutate({ lessonId });
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
        {user?.instructor === false && !isPastLesson && (
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
            {userBooking ? 'Cancelar reserva' : 'Reservar clase'}
          </Button>
        )}
        {user?.instructor && !isPastLesson && (
          <Button
            key={lesson.id}
            variant="contained"
            color={'error'}
            onClick={() => {
              const timeString = convertDateToTimeString(new Date(lesson.startDate));
              deleteLesson(lesson.id, timeString);
            }}
            className="lesson-time-button"
          >
            Cancelar clase
          </Button>
        )}
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
        lessonId={lesson.id}
      />
    </Card>
  );
}
