import React, { useState } from 'react';
import './Login.css';
import BookIcon from '@mui/icons-material/Book';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
          const response = await axios.post('https://localhost:7197/api/Auth/Login', {
            email,
            password,
          });
          console.log('Login successful:', response.data);
    
          // Başarılı giriş sonrası yönlendirme
          navigate('/');
        } catch (err) {
          console.error('Login error:', err);
          setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
      };
    return (
        <div className='logincontainer'>
            <div className='loginbody'>
                <div className='loginTitle'>
                    <BookIcon style={{ fontSize: '2.6rem' }}/>
                    <p className='h1'> Login</p>
                    <hr style={{height:"0px", border:"none", borderTop:"4px solid black", borderRadius:"3rem", width:"50%"}}></hr>
                </div>
                <div className='logininputs'>
                <TextField onChange={(e) => setEmail(e.target.value)} type='email' value={email} label="Email" variant="standard" />
                <TextField onChange={(e) => setPassword(e.target.value)} type='password' value={password} label="Password" variant="standard" />
                {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
                </div>
                <Button type='submit' onClick={handleLogin} className='loginbutton' variant="contained">Login</Button>
                <b>You don't have account?<button onClick={() => navigate('/Register')}  className='btn btn-link'>Register now</button></b>
            </div>
        </div>
    );
};

export default Login;