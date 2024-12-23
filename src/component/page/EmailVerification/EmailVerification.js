import React from 'react';
import './EmailVerification.css';
import Button from '@mui/material/Button';
import {useNavigate } from 'react-router-dom'; 
const EmailVerification = () => {
    const navigate = useNavigate()
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