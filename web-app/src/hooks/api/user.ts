import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../apiClient';

export interface Plan {
  id: string;
  name: string;
  price: number;
  lessons: number;
  mode: 'subscription' | 'payment';
  order: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  nickName?: string;
  image: string;
  belt: string;
  startDate: string;
  instructor: boolean;
  plan: Plan | null;
  planBookings: number;
}

export function useGetUser(id: number) {
  return useQuery(['user', id], async () => {
    const { data } = await apiClient.get<User>(`/users/${id}`);
    return data;
  });
}

export function useGetUsers() {
  return useQuery(['users'], async () => {
    const { data } = await apiClient.get<User[]>(`/users`);
    return data;
  });
}

interface UserChangeset {
  planId?: string | null;
  paidAt?: string | null;
}
export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ id, changeset }: { id: number; changeset: UserChangeset }) => {
      const { data } = await apiClient.patch<User>(`/users/${id}`, changeset);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users']);
      },
    },
  );
}
