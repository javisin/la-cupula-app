import React, { useMemo } from 'react';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useGetUsers, useUpdateUser } from '../../hooks/api/user';
import { useGetPlans } from '../../hooks/api/plan';
import './students.scss';

export default function StudentsPage() {
  const users = useGetUsers().data ?? [];
  const plans = useGetPlans().data ?? [];
  const updateUserMutation = useUpdateUser();

  const students = useMemo(() => users.filter((user) => !user.instructor), [users]);

  const handlePlanChange = (event: SelectChangeEvent<number>, userId: number) => {
    const value = event.target.value as number;
    const planId = value === 0 ? null : value;
    updateUserMutation.mutate({ id: userId, changeset: { planId: planId } });
  };

  const noti = async () => {
    const registration = await navigator.serviceWorker.register('serviceworker.js', {
      scope: './',
    });
    // Triggers popup to request access to send notifications
    const result = await window.Notification.requestPermission();

    // If the user rejects the permission result will be "denied"
    if (result === 'granted') {
      // You must use the service worker notification to show the notification
      // Using new Notification("Hello World", { body: "My first notification on iOS"}) does not work on iOS
      // despite working on other platforms
      setTimeout(async () => {
        await registration.showNotification('Hello World', {
          body: 'My first notification on iOS',
        });
      }, 3000);
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Estudiantes
      </Typography>
      <button onClick={noti}>test</button>
      <div className="list-box">
        <List>
          {students.map((user) => (
            <ListItem key={user.id}>
              <ListItemAvatar>
                <Avatar alt={user.nickName} src={user.image} />
              </ListItemAvatar>
              <ListItemText primary={user.nickName} />
              <Select
                value={user.plan?.id ?? 0}
                onChange={(event) => handlePlanChange(event, user.id)}
                className="plan-select"
              >
                <MenuItem value={0}>Sin plan</MenuItem>
                {plans.map((plan) => (
                  <MenuItem value={plan.id}>{plan.name}</MenuItem>
                ))}
              </Select>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}
