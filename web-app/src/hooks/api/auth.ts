import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

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

    return axios.post('/api/auth/sign-up', formData);
  });
}

interface LoginBody {
  email: string;
  password: string;
}
export function useLogin() {
  return useMutation(async (credentials: LoginBody) => {
    return axios.post('/api/auth/login', credentials);
  });
}
