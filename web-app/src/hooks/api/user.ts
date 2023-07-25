import { useQuery } from '@tanstack/react-query';
import apiClient from '../../apiClient';

export function useGetUser(id: number) {
  return useQuery(['user', id], async () => {
    const { data } = await apiClient.get(`/users/${id}`);
    return data;
  });
}
