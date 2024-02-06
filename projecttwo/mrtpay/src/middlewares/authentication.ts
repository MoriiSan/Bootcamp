import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const sessionToken = localStorage.getItem('TICKETING-AUTH') ?? '';

        if (!sessionToken) {
            navigate('/');
        }
        // console.log("t", sessionToken)

        try {
            const decoded = jwtDecode(sessionToken);

            const currentTimestamp = Math.floor(Date.now()/3600);
            if (decoded.exp && decoded.exp < currentTimestamp) {
                console.error('Token has expired');
                localStorage.removeItem('TICKETING-AUTH');
                navigate('/');
                return;
                }
            // console.log('Token is valid:', decoded);
        } catch (error) {
            console.error('Token is not valid:', error);
            localStorage.removeItem('TICKETING-AUTH');
            navigate('/');
        }
    }, [navigate]);

    const login = (token: string) => {
        localStorage.setItem('TICKETING-AUTH', token);
        navigate('/admin');
    };

    const logout = () => {
        localStorage.removeItem('TICKETING-AUTH');
        navigate('/');
    }

    const isAuthenticated = () => {
        return !!localStorage.getItem('TICKETING-AUTH');
    };

    return {login, logout, isAuthenticated};
}

export default useAuth;