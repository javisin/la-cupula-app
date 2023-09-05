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
  const getUsersQuery = useGetUsers();
  const users = useMemo(() => getUsersQuery.data ?? [], [getUsersQuery.data]);
  const plans = useGetPlans().data ?? [];
  const updateUserMutation = useUpdateUser();

  const students = useMemo(() => users.filter((user) => !user.instructor), [users]);

  const handlePlanChange = (event: SelectChangeEvent<string>, userId: number) => {
    const value = event.target.value as string;
    const planId = value === 'no plan' ? null : value;
    updateUserMutation.mutate({ id: userId, changeset: { planId: planId } });
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Alumnos
      </Typography>
      <div className="list-box">
        <List>
          {students.map((user) => (
            <ListItem key={user.id}>
              <ListItemAvatar>
                <Avatar alt={user.nickName} src={user.image} />
              </ListItemAvatar>
              <ListItemText primary={user.nickName ?? `${user.firstName} ${user.lastName}`} />
              <Select
                value={user.plan?.id ?? 'no plan'}
                onChange={(event) => handlePlanChange(event, user.id)}
                className="plan-select"
              >
                <MenuItem value={'no plan'}>Sin plan</MenuItem>
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
