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
  totalBookings?: number;
}

export function useGetUser(id: number) {
  return useQuery(['user', id], async () => {
    const { data } = await apiClient.get<User>(`/users/${id}`);
    return data;
  });
}

interface GetUsersFilter {
  hasPlan?: boolean;
  instructor?: boolean;
}
export function useGetUsers(filter?: GetUsersFilter) {
  return useQuery(['users', filter], async () => {
    const params = new URLSearchParams();
    if (filter?.hasPlan) {
      params.set('hasPlan', 'true');
    }
    if (filter?.instructor !== undefined) {
      params.set('instructor', filter.instructor.toString());
    }
    const { data } = await apiClient.get<User[]>(`/users`, { params });
    return data;
  });
}

interface UserChangeset {
  planId?: string | null;
  paidAt?: string | null;
  belt?: string;
}
export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ id, changeset }: { id: number; changeset: UserChangeset }) => {
      const { data } = await apiClient.patch<User>(`/users/${id}`, changeset);
      return data;
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(['users']);
        queryClient.invalidateQueries(['user', variables.id]);
      },
    },
  );
}

export function useUpdateUserImage() {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ id, image }: { id: number; image: File }) => {
      const formData = new FormData();
      formData.append('image', image);
      const { data } = await apiClient.patch<User>(`/users/${id}/image`, formData);
      return data;
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(['users']);
        queryClient.invalidateQueries(['user', variables.id]);
      },
    },
  );
}
