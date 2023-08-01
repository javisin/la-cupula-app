import React from 'react';
import {
  Avatar,
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

// Sample data for students (replace this with your actual data)
const students = [
  {
    id: 1,
    name: 'John Doe',
    avatarUrl: 'https://example.com/avatar1.jpg',
    subscriptionType: 'Premium',
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatarUrl: 'https://example.com/avatar2.jpg',
    subscriptionType: 'Basic',
  },
  // Add more student data as needed
];
//
// const useStyles = makeStyles((theme) => ({
//   root: {
//     maxWidth: 400,
//     margin: '0 auto',
//     paddingTop: theme.spacing(2),
//   },
//   listItem: {
//     marginBottom: theme.spacing(2),
//   },
// }));

const StudentsPage = () => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Estudiantes
      </Typography>
      <List>
        {students.map((student) => (
          <ListItem key={student.id}>
            <ListItemAvatar>
              <Avatar alt={student.name} src={student.avatarUrl} />
            </ListItemAvatar>
            <ListItemText primary={student.name} secondary={`Plan: ${student.subscriptionType}`} />
            <Badge variant="dot" />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default StudentsPage;
