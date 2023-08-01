import { useQuery } from '@tanstack/react-query';
import apiClient from '../../apiClient';
import { Plan } from './user';

export function useGetPlans() {
  return useQuery(['plans'], async () => {
    const { data } = await apiClient.get<Plan[]>(`/plans`);
    return data;
  });
}
