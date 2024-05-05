import Cookies from 'js-cookie';

// encapsulate this because we're almost certainly going to want to change how we store the token later
export const TokenProvider = {
    getToken() {
        return Cookies.get('token') || null
    },

    async setToken(token: string | null) {
        
        if (token) {
            Cookies.set('token', token, { expires: 7 });
        } else {
            Cookies.remove('token');
        }
    }
};
