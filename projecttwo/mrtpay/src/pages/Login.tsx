import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../middlewares/authentication';

import './Login.css';

export default function Login() {
    const [isHovered, setIsHovered] = useState(false);
    const [username, setUsername]=useState('')
    const [password, setPassword]=useState('')
   
    const loginButton = {
        backgroundColor: isHovered ? '#fccd5d' : '#FBC034',
    };
    
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();
 
    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/adminpage');
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                // console.log(data)
                const sessionToken = data.sessionToken;
                login(sessionToken);
             
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };
        
    return(
        <div className="page h-screen">
            <div className="content">
                <header className='welcome'>Welcome to MRT</header>
                    <div className="login-box">
                        <input className='username'
                                onChange={(e)=>{setUsername(e.target.value)}} 
                                placeholder='Username'
                                ></input>
                        <input className='password'
                                type='password'
                                onChange={(e)=>{setPassword(e.target.value)}} 
                                placeholder='Password'
                                ></input>
                        <button className='loginSubmit' 
                                style={loginButton}                               
                                onMouseEnter={() => setIsHovered(true)} 
                                onMouseLeave={() => setIsHovered(false)}
                                onClick={handleLogin}
                                >Login
                        </button>
                    </div>
            </div>
        </div>
    )
}
