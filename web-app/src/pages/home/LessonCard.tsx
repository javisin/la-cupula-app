import React, { useState } from 'react';
import { Avatar, Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Booking, useCreateBooking, useDeleteBooking } from '../../hooks/api/booking';
import { Lesson, useDeleteLessons } from '../../hooks/api/lesson';
import './home.scss';
import { convertDateToTimeString } from '../../util/dates';
import ParticipantsList from './ParticipantsList';
import { getCurrentUser } from '../../util/auth';
import { useGetUser } from '../../hooks/api/user';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateLessonModal from './UpdateLessonModal';

interface LessonCardProps {
  lesson: Lesson;
  bookings: Booking[];
  userBooking?: Booking;
}

export default function LessonCard({ lesson, userBooking, bookings }: LessonCardProps) {
  const user = getCurrentUser();
  const currentUserId = parseInt(user!.sub);
  const userData = useGetUser(currentUserId);
  const [isUpdateLessonModalOpen, setIsUpdateLessonModalOpen] = useState(false);

  const createBookingMutation = useCreateBooking();
  const deleteBookingMutation = useDeleteBooking();
  const deleteLessonMutation = useDeleteLessons();
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);

  const isPastLesson = new Date() > new Date(lesson.startDate);
  const createBooking = (lessonId: number, date: string) => {
    if (!userData.data?.plan) {
      alert(
        'Lo sentimos, no has contratado ningún plan. Para seguir reservando ve a la página de pago y no te pierdas ningún entrenamiento',
      );
      return;
    }
    createBookingMutation.mutate(
      { lessonId, userId: currentUserId },
      {
        onSuccess: () => {
          alert(`Has reservado la clase a las ${date}.`);
        },
        onError: () => {
          alert(
            'Lo sentimos, actualmente no cuentas con más clases en tu plan. Para seguir reservando ve a la página de pago y no te pierdas ningún entrenamiento',
          );
        },
      },
    );
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
    <>
      {user?.instructor && (
        <UpdateLessonModal
          isOpen={isUpdateLessonModalOpen}
          close={() => setIsUpdateLessonModalOpen(false)}
          initialValues={{
            date: lesson.startDate,
            startTime: convertDateToTimeString(new Date(lesson.startDate)),
            endTime: convertDateToTimeString(new Date(lesson.endDate)),
            type: lesson.type,
            professorId: lesson.professor.id,
          }}
          lessonId={lesson.id}
        />
      )}
      <Card className="lesson-card">
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent={'center'} mb={1}>
            <Avatar
              src={lesson.professor.image}
              alt="Profesor"
              sx={{ width: 56, height: 56, mr: 2 }}
            />
            <Box>
              <Typography>
                {`${convertDateToTimeString(
                  new Date(lesson.startDate),
                )} - ${convertDateToTimeString(new Date(lesson.endDate))}`}
              </Typography>
              <Typography fontWeight="bold" color="primary">
                {lesson.type}
              </Typography>
            </Box>
          </Box>
          {user?.sub !== lesson.professor.id.toString() && !isPastLesson && (
            <Button
              variant="contained"
              size="small"
              color={userBooking ? 'error' : 'primary'}
              disabled={!userBooking && bookings.length >= lesson.maxSeats}
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
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
              <IconButton
                color="primary"
                onClick={() => {
                  setIsUpdateLessonModalOpen(true);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => {
                  const timeString = convertDateToTimeString(new Date(lesson.startDate));
                  deleteLesson(lesson.id, timeString);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
          <Typography
            className="participants-button"
            color="primary"
            onClick={() => setIsParticipantsModalOpen(true)}
          >
            {`Ver participantes (${bookings.length}/${lesson.maxSeats})`}
          </Typography>
        </CardContent>

        <ParticipantsList
          bookings={bookings}
          isOpen={isParticipantsModalOpen}
          closeModal={() => setIsParticipantsModalOpen(false)}
          lessonId={lesson.id}
        />
      </Card>
    </>
  );
}
