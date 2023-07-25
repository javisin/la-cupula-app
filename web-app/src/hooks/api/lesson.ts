import { useQuery } from '@tanstack/react-query';
import apiClient from '../../apiClient';

interface Lesson {
  id: number;
  type: 'gi' | 'nogi';
  startDate: string;
  endDate: string;
}
export function useGetLessons() {
  return useQuery(['lessons'], async () => {
    const { data } = await apiClient.get<Lesson[]>(`/lessons`);
    return data;
  });
}
