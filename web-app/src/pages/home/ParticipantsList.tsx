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
import { Booking } from '../../hooks/api/booking';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { getCurrentUser } from '../../util/auth';

interface LessonCardProps {
  bookings: Booking[];
  isOpen: boolean;
  closeModal: () => void;
}

export default function ParticipantsList({ closeModal, bookings, isOpen }: LessonCardProps) {
  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <DialogTitle>Lista de participantes</DialogTitle>
      <DialogContent>
        <List>
          {bookings.map((booking) => (
            <ListItem key={booking.userId}>
              <ListItemText primary={`${booking.user.firstName} ${booking.user.lastName}`} />
              {/*<IconButton color="primary">*/}
              {/*  <CheckIcon />*/}
              {/*</IconButton>*/}
              {/*<IconButton color="secondary">*/}
              {/*  <ClearIcon />*/}
              {/*</IconButton>*/}
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
