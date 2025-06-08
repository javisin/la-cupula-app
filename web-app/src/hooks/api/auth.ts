import { useMutation } from '@tanstack/react-query';
import apiClient from '../../apiClient';
import { useNavigate } from 'react-router-dom';

interface SignUpBody {
  firstName: string;
  lastName: string;
  belt: string;
  stripes: string;
  email: string;
  password: string;
  startDate: string;
  image: File;
}

export function useSignUp() {
  return useMutation(async (userData: SignUpBody) => {
    const formData = new FormData();
    formData.append('firstName', userData.firstName);
    formData.append('lastName', userData.lastName);
    formData.append('belt', userData.belt);
    formData.append('stripes', userData.stripes);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    formData.append('startDate', userData.startDate);
    formData.append('image', userData.image);

    const { data } = await apiClient.post('/auth/sign-up', formData);
    return data;
  });
}

interface LoginBody {
  email: string;
  password: string;
}
export function useLogin() {
  const navigate = useNavigate();
  return useMutation(
    async (credentials: LoginBody) => {
      const { data } = await apiClient.post<string>('/auth/login', credentials);
      return data;
    },
    {
      onSuccess: (data) => {
        localStorage.setItem('token', data);
        navigate('/home');
      },
    },
  );
}

export function useRequestPasswordReset() {
  return useMutation(async ({ email }: { email: string }) => {
    const { data } = await apiClient.post('/auth/password-reset/request', { email });
    return data;
  });
}

export function useResetPassword() {
  return useMutation(async ({ token, password }: { token: string; password: string }) => {
    const { data } = await apiClient.post('/auth/password-reset/reset', { token, password });
    return data;
  });
}
