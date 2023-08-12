import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../apiClient';
import { getCurrentUser } from '../../util/auth';
import { User } from './user';

interface GetBookingsFilter {
  userId?: number;
  date?: Date;
}
export interface Booking {
  id: number;
  userId: number;
  lessonId: number;
  user: User;
}

export function useGetBookings(filter: GetBookingsFilter) {
  const { userId, date } = filter;
  const params = new URLSearchParams();
  if (userId) {
    params.set('userId', userId.toString());
  }

  if (date) {
    params.set('date', date.toISOString().slice(0, 10));
  }

  return useQuery(['bookings', params.toString()], async () => {
    const { data } = await apiClient.get<Booking[]>(`bookings?${params.toString()}`);
    return data;
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const user = getCurrentUser();
  return useMutation(
    async ({ lessonId }: { lessonId: number }) => {
      const { data } = await apiClient.post<string>(`/bookings`, { userId: user?.sub, lessonId });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['bookings']);
      },
    },
  );
}

interface BookingChangeset {
  status: 'approved' | 'declined' | 'pending';
}

export function useUpdateBooking() {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ bookingId, changeset }: { bookingId: number; changeset: BookingChangeset }) => {
      const { data } = await apiClient.patch<Booking>(`/bookings/${bookingId}`, changeset);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['bookings']);
      },
    },
  );
}

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ bookingId }: { bookingId: number }) => {
      const { data } = await apiClient.delete(`/bookings/${bookingId}`);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['bookings']);
      },
    },
  );
}
