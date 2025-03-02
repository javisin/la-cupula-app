import React, { useState } from 'react';
import { List, ListItem, ListItemText, Typography, Modal, Box } from '@mui/material';
import { useGetPlans } from '../../hooks/api/plan';
import apiClient from '../../apiClient';
import Button from '@mui/material/Button';
import { useGetUser } from '../../hooks/api/user';
import { getCurrentUser } from '../../util/auth';

export default function PaymentPage() {
  const plans = useGetPlans().data?.filter((plan) => plan.order > 0) ?? [];
  const currentUser = getCurrentUser();
  const { data: user } = useGetUser(parseInt(currentUser?.sub ?? '1'));

  const [open, setOpen] = useState(false);

  const redirectToCheckout = async (planId: string) => {
    try {
      const { data } = await apiClient.get<string>(`/checkout-url?planId=${planId}`);
      window.location.replace(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Pago
      </Typography>
      <div className="list-box">
        <List>
          {plans.map((plan) => (
            <ListItem key={plan.id}>
              <ListItemText
                primary={plan.name}
                secondary={`${plan.price}€ ${plan.mode === 'subscription' ? '/ mes' : ''}`}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => redirectToCheckout(plan.id)}
                disabled={!!user?.plan}
              >
                {user?.plan?.id === plan.id ? 'Pagado' : 'Pagar'}
              </Button>
            </ListItem>
          ))}
        </List>

        {user?.plan && (
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Darme de baja
          </Button>
        )}
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography sx={{ mt: 2 }}>
              Para tramitar la baja, por favor contáctanos a través de
              <a href="https://wa.me/34722613752" target="_blank" rel="noreferrer">
                {' '}
                WhatsApp
              </a>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
