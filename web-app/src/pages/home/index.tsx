import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { getCurrentUser, logout } from '../../util/auth';
import { useGetUser } from '../../hooks/api/user';
import Button from '@mui/material/Button';
import { useGetLessons } from '../../hooks/api/lesson';
import './home.css';
import { convertDateToTimeString } from '../../util/dates';

export default function HomePage() {
  const getLessonsQuery = useGetLessons();
  const lessons = getLessonsQuery.data ?? [];

  const handleLessonTimeClick = (id: number, date: string) => {
    alert(`Has reservado la clase a las ${date}.`);
  };

  return (
    <Box maxWidth={300} mx="auto" my={2}>
      <div className="lesson-times-container">
        <h2>Clases de mañana</h2>
        <div className="lesson-times-list">
          {lessons.map((lesson) => (
            <Card key={lesson.id} className="lesson-card">
              <CardContent>
                <Typography variant="h5" component="h2">
                  {`${convertDateToTimeString(new Date(lesson.startDate))} -
                  ${convertDateToTimeString(new Date(lesson.endDate))}`}
                </Typography>
                <Typography color="textSecondary">{lesson.type}</Typography>
                <Box>
                  <Button
                    key={lesson.id}
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleLessonTimeClick(
                        lesson.id,
                        convertDateToTimeString(new Date(lesson.startDate)),
                      )
                    }
                    className="lesson-time-button"
                  >
                    Reservar clase
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Box>
  );
}
