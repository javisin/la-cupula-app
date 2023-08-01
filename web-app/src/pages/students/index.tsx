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

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Estudiantes
      </Typography>
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
