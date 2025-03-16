import { useQuery } from '@tanstack/react-query';
import apiClient from '../../apiClient';

export interface Academy {
  id: number;
  name: string;
}

export function useGetAcademies() {
  return useQuery(['academies'], async () => {
    const { data } = await apiClient.get<Academy[]>(`/academies`);
    return data;
  });
}
