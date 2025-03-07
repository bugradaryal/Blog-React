import React, { useState } from 'react';
import './Login.css';
import BookIcon from '@mui/icons-material/Book';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { useTranslation } from "react-i18next";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setmessage] = useState('');
    const navigate = useNavigate();
    const { t } = useTranslation("logintable");

    const handleLogin = async (e) => {
        e.preventDefault();
        setmessage('');
    
          await axios.post('https://localhost:7197/api/Auth/Login', {
            email,
            password,
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(response => {
            if(response && response.status === 200){
              const authorization = response.headers['authorization'];  // Küçük harf ile 'jwttoken'
              const refreshToken = response.headers['refreshtoken']; // Küçük harf ile 'refreshtoken'

              if (authorization && refreshToken) {
                  // Token'ları localStorage'a kaydet
                  localStorage.setItem('authorization', authorization);
                  localStorage.setItem('refreshToken', refreshToken);
                } else {
                  console.error('Tokenlar alınamadı.');
                  navigate('/Login');
                }
              // Başarılı giriş sonrası yönlendirme
              console.log('Login successful:', response.data);
              navigate('/');
            }
          });
          

      };
    return (
        <div className='logincontainer'>
            <form className='loginbody' onSubmit={handleLogin}>
                <div className='loginTitle'>
                    <BookIcon style={{ fontSize: '2.6rem' }}/>
                    <p className='h1'> {t("login")}</p>
                    <hr style={{height:"0px", border:"none", borderTop:"4px solid black", borderRadius:"3rem", width:"50%"}}></hr>
                </div>
                <div className='logininputs'>
                <TextField onChange={(e) => setEmail(e.target.value)} type='email' value={email} label={t("email")} variant="standard" required />
                <TextField onChange={(e) => setPassword(e.target.value)} type='password' value={password} label={t("pass")} variant="standard" required />
                {message && <p className="error-message" style={{ color: 'red' }}>{message}</p>}
                </div>
                <Button sx={{backgroundColor:"black"}} type='submit' className='loginbutton' variant="contained">{t("loginbutton")}</Button>
                <b>{t("logintext")}<button onClick={() => navigate('/Register')}  className='btn btn-link'>{t("registertext")}</button></b>
            </form>
        </div>
    );
};

export default Login;