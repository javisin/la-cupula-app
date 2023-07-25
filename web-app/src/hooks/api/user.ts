import { useQuery } from '@tanstack/react-query';
import apiClient from '../../apiClient';

interface User {
  firstName: string;
}
export function useGetUser(id: number) {
  return useQuery(['user', id], async () => {
    const { data } = await apiClient.get<User>(`/users/${id}`);
    return data;
  });
}
