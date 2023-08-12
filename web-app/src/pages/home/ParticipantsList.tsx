import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import Button from '@mui/material/Button';
import { Booking, useUpdateBooking } from '../../hooks/api/booking';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { getCurrentUser } from '../../util/auth';

interface LessonCardProps {
  bookings: Booking[];
  isOpen: boolean;
  closeModal: () => void;
}

export default function ParticipantsList({ closeModal, bookings, isOpen }: LessonCardProps) {
  const user = getCurrentUser();
  const updateBookingMutation = useUpdateBooking();

  const updateBooking = (bookingId: number, status: 'approved' | 'declined') => {
    updateBookingMutation.mutate({
      bookingId,
      changeset: { status },
    });
  };

  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <DialogTitle>Lista de participantes</DialogTitle>
      <DialogContent>
        <List>
          {bookings.map((booking) => (
            <ListItem key={booking.userId}>
              <ListItemText primary={`${booking.user.firstName} ${booking.user.lastName}`} />
              {user?.instructor === true && (
                <>
                  <IconButton color="primary" onClick={() => updateBooking(booking.id, 'approved')}>
                    <CheckIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => updateBooking(booking.id, 'declined')}
                  >
                    <ClearIcon />
                  </IconButton>
                </>
              )}
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
