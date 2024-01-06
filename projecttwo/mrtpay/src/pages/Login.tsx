import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    
    return(
        <div className="bg-custom-light-green">
            <div className="flex items-center justify-center h-screen">
                    <button className="border-custom-dark-green px-24 py-16 border-2 rounded-md text-custom-dark-green text-3xl font-extrabold hover:text-custom-yellow hover:border-custom-yellow" 
                            onClick={()=>{navigate('adminpage')}}>LOGIN</button>
            </div>
        </div>
    )
}