import React, { ReactNode } from 'react';
import './index.scss';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../util/auth';

export default function Index({ children }: { children: ReactNode }) {
  const tabRoutes = ['/home', '/profile', '/students'];
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();

  const selectedTab = tabRoutes.findIndex((route) => location.pathname.includes(route));
  const onClickTab = (tab: number) => {
    navigate(tabRoutes[tab]);
  };

  return (
    <Box maxWidth={300} mx="auto" my={2}>
      {children}
      <Box className="tabs-container">
        <BottomNavigation
          sx={{ backgroundColor: 'primary.main' }}
          showLabels
          value={selectedTab}
          onChange={(_, newValue) => onClickTab(newValue)}
        >
          <BottomNavigationAction
            sx={{ color: 'gray' }}
            label="Reservas"
            icon={<EventIcon style={{ color: 'gray' }} />}
          />
          <BottomNavigationAction
            sx={{ color: 'gray' }}
            label="Perfil"
            icon={<PersonIcon style={{ color: 'gray' }} />}
          />
          {user?.instructor && (
            <BottomNavigationAction
              sx={{ color: 'gray' }}
              label="Estudiantes"
              icon={<SportsKabaddiIcon style={{ color: 'gray' }} />}
            />
          )}
        </BottomNavigation>
      </Box>
    </Box>
  );
}
