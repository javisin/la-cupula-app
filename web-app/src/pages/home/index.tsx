import React, { useState } from 'react';
import { useGetLessons } from '../../hooks/api/lesson';
import { useGetBookings } from '../../hooks/api/booking';
import './home.scss';
import { convertDateToDateString } from '../../util/dates';
import { getCurrentUser } from '../../util/auth';
import TextField from '@mui/material/TextField';
import LessonCard from './LessonCard';

export default function HomePage() {
  const [date, setDate] = useState(convertDateToDateString(new Date()));

  const getLessonsQuery = useGetLessons({ date: new Date(date) });
  const getBookingsQuery = useGetBookings({
    date: new Date(date),
  });

  const bookings = getBookingsQuery.data ?? [];
  const currentUser = getCurrentUser();
  const lessons = getLessonsQuery.data ?? [];

  if (!currentUser) {
    return null;
  }

  return (
    <div className="lesson-times-container">
      <h2>Clases</h2>
      <TextField
        name="date"
        type="date"
        variant="outlined"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />
      <div className="lesson-times-list">
        {lessons.map((lesson) => {
          const lessonBookings = bookings.filter((booking) => booking.lessonId === lesson.id);

          const userBooking = lessonBookings.find(
            (booking) => booking.userId.toString() === currentUser.sub,
          );

          return (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              userBooking={userBooking}
              bookings={lessonBookings}
            />
          );
        })}
      </div>
    </div>
  );
}
