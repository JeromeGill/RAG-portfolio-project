import Cookies from 'js-cookie';
import { useLogin } from '@/hooks/useLogin';

export const loginAction = (
    username: string,
    password: string
) => fetch(
    'http://localhost:8000/api/login',
    {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

