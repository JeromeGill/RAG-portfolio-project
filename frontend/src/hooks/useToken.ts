import { useState } from 'react';
import Cookies from 'js-cookie';

export const useToken = () => {
  const [token, setTokenState] = useState<string | null>(() => {
    const cookieToken = Cookies.get('token');
    return cookieToken || null;
  });

  const setToken = (newToken: string | null) => {
    if (newToken) {
      // Set the token cookie with an expiry of 7 days
      Cookies.set('token', newToken, { expires: 7 });
      setTokenState(newToken);
    } else {
      // If newToken is null, remove the token cookie
      Cookies.remove('token');
      setTokenState(null);
    }
  };

  return { token, setToken };
};
