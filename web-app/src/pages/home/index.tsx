import React, { useState } from 'react';
import { useGetLessons } from '../../hooks/api/lesson';
import { useGetBookings } from '../../hooks/api/booking';
import './home.scss';
import { convertDateToDateString } from '../../util/dates';
import { getCurrentUser } from '../../util/auth';
import TextField from '@mui/material/TextField';
import LessonCard from './LessonCard';
import Button from '@mui/material/Button';
import CreateLessonModal from './CreateLessonModal';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useGetAcademies } from '../../hooks/api/academy';

const DEFAULT_ACADEMY_ID = 1;

export default function HomePage() {
  const [date, setDate] = useState(convertDateToDateString(new Date()));
  const [academy, setAcademy] = useState(DEFAULT_ACADEMY_ID);
  const [isCreateLessonModalOpen, setIsCreateLessonModalOpen] = useState(false);

  const { data: academies } = useGetAcademies();
  const getLessonsQuery = useGetLessons({ date: new Date(date), academyId: academy });
  const getBookingsQuery = useGetBookings({ date: new Date(date) });

  const bookings = getBookingsQuery.data ?? [];
  const currentUser = getCurrentUser();
  const lessons = getLessonsQuery.data ?? [];

  if (!currentUser) return null;

  return (
    <div className="lesson-times-container">
      <CreateLessonModal
        isOpen={isCreateLessonModalOpen}
        close={() => setIsCreateLessonModalOpen(false)}
      />

      <h2>Clases</h2>

      <div
        className="selectors-container"
        style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}
      >
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor={'academy-selector'}>📍 Academia</InputLabel>
          <Select
            id="academy-selector"
            label="📍Academia"
            value={academy}
            onChange={(event) => setAcademy(Number(event.target.value))}
          >
            {academies?.map((academy) => (
              <MenuItem key={academy.id} value={academy.id}>
                {academy.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          name="date"
          type="date"
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(event) => setDate(event.target.value)}
          sx={{ maxWidth: '250px' }}
        />
      </div>

      {currentUser.instructor && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsCreateLessonModalOpen(true)}
          sx={{ marginTop: 2 }}
        >
          Añadir clase
        </Button>
      )}

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
