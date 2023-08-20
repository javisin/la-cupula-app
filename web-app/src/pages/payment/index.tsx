import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { useGetPlans } from '../../hooks/api/plan';
import apiClient from '../../apiClient';
import Button from '@mui/material/Button';

export default function PaymentPage() {
  const plans = useGetPlans().data ?? [];

  const redirectToCheckout = async (planId: string) => {
    try {
      const { data } = await apiClient.get<string>(`/checkout-url?planId=${planId}`);
      window.location.replace(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Pago
      </Typography>
      <div className="list-box">
        <List>
          {plans.map((plan) => (
            <ListItem key={plan.id}>
              <ListItemText primary={plan.name} />
              <Button
                variant="contained"
                color="primary"
                onClick={() => redirectToCheckout(plan.id)}
              >
                Pagar
              </Button>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}
