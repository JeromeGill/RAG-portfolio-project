import { useState } from 'react';
import { redirect } from 'react-router-dom';
import { AuthProvider } from '@/auth/AuthProvider';

export const useLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await AuthProvider.signin(username, password);
      if (response.ok) {
        // this will need to redirect to the page the user was trying to access if we add more routes
        redirect("/")
      } else {
        // Handle each error case. Maybe use one of the react query libraries to handle this
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again later.');
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleSubmit,
  };
};