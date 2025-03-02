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
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useGetUsers, useUpdateUser } from '../../hooks/api/user';
import { useGetPlans } from '../../hooks/api/plan';
import { useNavigate } from 'react-router-dom';
import './students.scss';

export default function StudentsPage() {
  const [showActiveOnly, setShowActiveOnly] = useState(true);
  const getUsersQuery = useGetUsers({ hasPlan: showActiveOnly });
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
            user.lastName?.toLowerCase().includes(searchText)) &&
          (!showActiveOnly || user.plan),
      ),
    [users, searchText, showActiveOnly],
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
    <div className="students-container">
      <Typography variant="h6" gutterBottom>
        Alumnos ({students.length})
      </Typography>
      <TextField
        className="student-searcher"
        label="Busca alumnos"
        variant="outlined"
        size="small"
        onChange={(e) => setSearchText(e.target.value.toLowerCase())}
      />
      <FormControlLabel
        control={
          <Checkbox checked={showActiveOnly} onChange={() => setShowActiveOnly(!showActiveOnly)} />
        }
        label="Solo activos"
      />
      <div className="list-box">
        <List>
          {students.map((user) => (
            <ListItem key={user.id} className="student-item">
              <ListItemAvatar onClick={() => navigateToStudent(user.id)}>
                <Avatar alt={user.nickName} src={user.image} sx={{ width: 40, height: 40 }} />
              </ListItemAvatar>
              <ListItemText
                primary={user.nickName ?? `${user.firstName} ${user.lastName}`}
                secondary={`${user.planBookings} clases`}
                onClick={() => navigateToStudent(user.id)}
                className="student-text"
              />
              <Select
                value={user.plan?.id ?? 'no plan'}
                onChange={(event) => handlePlanChange(event, user.id)}
                className="plan-select"
                size="small"
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
