import React from 'react';
import { getCurrentUser } from '../../util/auth';
import { useGetUser } from '../../hooks/api/user';
import ProfileView from '../../components/ProfileView';

export default function ProfilePage() {
  const currentUser = getCurrentUser();
  const { data: user } = useGetUser(parseInt(currentUser?.sub ?? '1'));

  if (!user) {
    return null;
  }

  return <ProfileView user={user} canLogout={true} />;
}
