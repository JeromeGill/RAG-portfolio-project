import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { authAction } from '@/actions/authActions';
import { useToken } from './useToken';

export const useLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {setToken} = useToken()
  const router = useRouter()


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await authAction(
        username,
        password
      )

      if (response.ok) {
        const { token } = await response.json();
        // @todo do proper session handling
        setToken(token)
        router.push("/")
      } else {
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
