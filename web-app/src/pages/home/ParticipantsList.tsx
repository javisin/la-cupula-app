import React, { useMemo, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material';
import Button from '@mui/material/Button';
import { Booking, useCreateBooking, useUpdateBooking } from '../../hooks/api/booking';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { getCurrentUser } from '../../util/auth';
import { useGetUsers } from '../../hooks/api/user';

interface LessonCardProps {
  bookings: Booking[];
  isOpen: boolean;
  closeModal: () => void;
  lessonId: number;
}

export default function ParticipantsList({
  closeModal,
  bookings,
  isOpen,
  lessonId,
}: LessonCardProps) {
  const user = getCurrentUser();
  const createBookingMutation = useCreateBooking();
  const updateBookingMutation = useUpdateBooking();
  const [newBookingUser, setNewBookingUser] = useState('');

  const getUsersQuery = useGetUsers();
  const users = useMemo(() => getUsersQuery.data ?? [], [getUsersQuery.data]);
  const students = useMemo(
    () =>
      users.filter(
        (user) => !user.instructor && !bookings.some((booking) => booking.user.id === user.id),
      ),
    [users, bookings],
  );

  const addAcceptedBooking = () => {
    createBookingMutation.mutate({
      lessonId,
      userId: parseInt(newBookingUser),
      status: 'approved',
    });
  };

  const updateBooking = (bookingId: number, status: 'approved' | 'declined') => {
    updateBookingMutation.mutate({
      bookingId,
      changeset: { status },
    });
  };

  const statusComponent = (booking: Booking) => {
    switch (booking.status) {
      case 'approved':
        return <CheckIcon />;
      case 'declined':
        return <ClearIcon />;
      case 'pending':
        return (
          <>
            <IconButton color="primary" onClick={() => updateBooking(booking.id, 'approved')}>
              <CheckIcon />
            </IconButton>
            <IconButton color="secondary" onClick={() => updateBooking(booking.id, 'declined')}>
              <ClearIcon />
            </IconButton>
          </>
        );
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <DialogTitle>Lista de participantes</DialogTitle>
      <DialogContent>
        {user?.instructor && (
          <div className="add-new-booking">
            <Select
              value={newBookingUser}
              onChange={(event) => {
                setNewBookingUser(event.target.value);
              }}
              className={'new-booking-select'}
            >
              {students.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.nickName ?? `${user.firstName} ${user.lastName}`}
                </MenuItem>
              ))}
            </Select>
            <Button
              variant="contained"
              disabled={newBookingUser === ''}
              onClick={() => {
                addAcceptedBooking();
              }}
            >
              Registrar asistencia
            </Button>
          </div>
        )}
        <List>
          {bookings.map((booking) => (
            <ListItem key={booking.userId}>
              <ListItemText primary={`${booking.user.firstName} ${booking.user.lastName}`} />
              {user?.instructor === true && statusComponent(booking)}
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
