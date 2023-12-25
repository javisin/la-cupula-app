import React from 'react';
import { useGetUser } from '../../hooks/api/user';
import ProfileView from '../../components/ProfileView';
import { useParams } from 'react-router-dom';

export default function StudentPage() {
  const { id } = useParams();
  const { data: user } = useGetUser(parseInt(id ?? ''));

  if (!user) {
    return null;
  }

  return <ProfileView user={user} canLogout={false} />;
}
