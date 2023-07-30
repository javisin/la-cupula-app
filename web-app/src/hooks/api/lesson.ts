import { useQuery } from '@tanstack/react-query';
import apiClient from '../../apiClient';
import { convertDateToDateString } from '../../util/dates';

export interface Lesson {
  id: number;
  type: 'gi' | 'nogi';
  startDate: string;
  endDate: string;
}

interface GetLessonsFilter {
  date?: Date;
}

export function useGetLessons({ date }: GetLessonsFilter) {
  const params = new URLSearchParams();

  if (date) {
    params.set('date', convertDateToDateString(date));
  }

  return useQuery(['lessons', params.toString()], async () => {
    const { data } = await apiClient.get<Lesson[]>(`/lessons?${params.toString()}`);
    return data;
  });
}
