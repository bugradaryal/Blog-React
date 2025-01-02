import React, { useEffect, useState } from 'react';
import './EmailVerification.css';
import Button from '@mui/material/Button';
import { useNavigate, useLocation  } from 'react-router-dom'; 
import axios from 'axios';
const EmailVerification = () => {
    const navigate = useNavigate();
    const location = useLocation(); 
    useEffect(()=>{
        const searchParams = new URLSearchParams(location.search); // URL'deki parametreleri çözümle
        const userId = searchParams.get('userId');
        const emailConfUrl = searchParams.get('emailConfUrl');
        if(userId && emailConfUrl){
            axios.post("https://localhost:7197/api/Auth/Emailverification",{
                userId: userId,
                emailConfUrl: emailConfUrl
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error.response.data.errors);
            });
        }
        console.log(userId);
        console.log(emailConfUrl);
    },[])
    return (
        <div className='verificationcontainer'>
            <div className='verificationbody'>
                <b className='h2'>Verification Succesfull</b>
                <p>Verification successful. You can log in to the website through the Login page.</p>
                <div>
                 <Button onClick={() => navigate('/Login')} variant="contained">Redirect to Login</Button>
                </div>
            </div>
        </div>
    );
};

export default EmailVerification;