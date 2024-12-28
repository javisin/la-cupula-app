import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../apiClient';
import { convertDateToDateString } from '../../util/dates';

export interface Lesson {
  id: number;
  type: 'gi' | 'nogi';
  startDate: string;
  endDate: string;
  professor: {
    id: number;
    firstName: string;
    lastName: string;
    image: string;
  };
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

interface CreateLessonBody {
  type: string;
  startDate: string;
  endDate: string;
  professorId: number;
}
export function useCreateLesson() {
  const queryClient = useQueryClient();
  return useMutation(
    async (lesson: CreateLessonBody) => {
      const { data } = await apiClient.post('/lessons', lesson);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['lessons']);
      },
    },
  );
}

interface UpdateLessonBody {
  changeset: {
    type?: string;
    startDate?: string;
    endDate?: string;
    professorId?: number;
  };
}

export function useUpdateLesson() {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ id, changeset }: { id: number; changeset: UpdateLessonBody['changeset'] }) => {
      await apiClient.patch<UpdateLessonBody>(`/lessons/${id}`, { changeset });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['lessons']);
      },
    },
  );
}

export function useDeleteLessons() {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ lessonId }: { lessonId: number }) => {
      const { data } = await apiClient.delete(`/lessons/${lessonId}`);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['bookings']);
        queryClient.invalidateQueries(['lessons']);
      },
    },
  );
}
