import React from 'react';
import './Register.css';
import {useNavigate } from 'react-router-dom'; 
import Button from '@mui/material/Button';
import TextField  from '@mui/material/TextField';
import BookIcon from '@mui/icons-material/Book';
const Register = () => {
    const navigate = useNavigate();
    return (
        <div className='registercontainer'>
            <div className='registerbody'>
                <div className='registertitle'>
                <BookIcon style={{ fontSize: '2.6rem' }}/>
                    <p className='h1'> Register</p>
                    <hr style={{height:"0px", border:"none", borderTop:"4px solid black", borderRadius:"3rem", width:"50%"}}></hr>
                </div>
                <div className='registerinputs'>
                    <div className='reginputstwopart'>
                          <TextField sx={{width:"48%"}} id="asd2" label="Name(Required)" variant="standard" />
                          <TextField sx={{width:"48%"}} id="asd2" label="Surname(Required)" variant="standard" />
                    </div>
                    <div className='reginputstwopart'>
                          <TextField sx={{width:"48%"}} id="asd2" label="User Name(Required)" variant="standard" />
                          <TextField sx={{width:"48%"}} id="asd2" label="Email(Required)" variant="standard" />
                    </div>
                    <div className='reginputstwopart'>
                          <TextField sx={{width:"48%"}} id="asd2" label="Phone Number" variant="standard" />
                          <TextField sx={{width:"48%"}} id="asd2" label="Adress" variant="standard" />
                    </div>
                    <div className='reginputstwopart'>
                          <TextField sx={{width:"48%"}} id="asd2" label="Password(Required)" variant="standard" />
                          <TextField sx={{width:"48%"}} id="asd2" label="Confirm Password(Required)" variant="standard" />
                    </div>
                </div>
                <Button className='loginbutton' variant="contained">Register</Button>
                <b>You have a account?<button onClick={() => navigate('/Login')}  className='btn btn-link'>Login now</button></b>
            </div>
        </div>
    );
};

export default Register;