import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const useAuth = () => {
    const navigate = useNavigate();
    const [dbToken, setDbToken] = useState('')



    useEffect(() => {
        const sessionToken = localStorage.getItem('TICKETING-AUTH') ?? '';

        if (!sessionToken) {
            if (sessionToken !== dbToken) {
                localStorage.removeItem('TICKETING-AUTH');
                navigate('/');
            }
        }

        // console.log("t", sessionToken)

        try {
            const decoded = jwtDecode<JwtPayload>(sessionToken);
            const userId = decoded.userId;
            // const decoded = jwt.verify(sessionToken, 'a1s2d3f4g5h6j7k8l90') as JwtPayload;

            const fetchUser = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_URL}users/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    const user = await response.json();
                    if (response.ok) {
                        setDbToken(user.authentication.sessionToken)
                        console.log(user)
                    } else {
                        console.error('Failed to fetch user');
                    }
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            };

            // console.log(fetchUser)
            fetchUser();

            const currentTimestamp = Math.floor(Date.now() / 3600);
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

    return { login, logout, isAuthenticated };
}

export default useAuth;