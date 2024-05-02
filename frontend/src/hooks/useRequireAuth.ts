import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToken } from './useToken';

export const useRequireAuth = () => {
  const router = useRouter();
  const { token } = useToken();

  useEffect(() => {
    if (!token) {
      console.log('redirecting to login');
      router.push('/login');
    }
  }, []);

  return;
};

