import React, { useMemo, useState } from 'react';
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
  TextField,
} from '@mui/material';
import { useGetUsers, useUpdateUser } from '../../hooks/api/user';
import { useGetPlans } from '../../hooks/api/plan';
import './students.scss';
import { useNavigate } from 'react-router-dom';

export default function StudentsPage() {
  const getUsersQuery = useGetUsers();
  const users = useMemo(() => getUsersQuery.data ?? [], [getUsersQuery.data]);
  const plans = useGetPlans().data ?? [];
  const updateUserMutation = useUpdateUser();
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const students = useMemo(
    () =>
      users.filter(
        (user) =>
          !user.instructor &&
          (user.nickName?.toLowerCase().includes(searchText) ||
            user.firstName?.toLowerCase().includes(searchText) ||
            user.lastName?.toLowerCase().includes(searchText)),
      ),
    [users, searchText],
  );

  const handlePlanChange = (event: SelectChangeEvent, userId: number) => {
    const value = event.target.value as string;
    const planId = value === 'no plan' ? null : value;
    updateUserMutation.mutate({
      id: userId,
      changeset: { planId: planId, paidAt: planId ? new Date().toISOString() : null },
    });
  };

  const navigateToStudent = (userId: number) => {
    navigate(`/students/${userId}`);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Alumnos
      </Typography>
      <TextField
        className="student-searcher"
        label="Busca alumnos"
        variant="outlined"
        onChange={(e) => setSearchText(e.target.value.toLowerCase())}
      />
      <div className="list-box">
        <List>
          {students.map((user) => (
            <ListItem key={user.id}>
              <ListItemAvatar onClick={() => navigateToStudent(user.id)}>
                <Avatar alt={user.nickName} src={user.image} />
              </ListItemAvatar>
              <ListItemText
                onClick={() => navigateToStudent(user.id)}
                primary={user.nickName ?? `${user.firstName} ${user.lastName}`}
                secondary={`${user.planBookings} clases`}
              />
              <Select
                value={user.plan?.id ?? 'no plan'}
                onChange={(event) => handlePlanChange(event, user.id)}
                className="plan-select"
              >
                <MenuItem value={'no plan'}>Sin plan</MenuItem>
                {plans.map((plan) => (
                  <MenuItem key={plan.id} value={plan.id}>
                    {plan.name}
                  </MenuItem>
                ))}
              </Select>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}
