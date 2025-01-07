import React, { useRef, useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom'; 
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import BookIcon from '@mui/icons-material/Book';
import axios from 'axios';
import { useTranslation } from "react-i18next";

const Register = () => {
    const [Name, setName] = useState(''); // `setname` yerine `setName` kullanıldı (standart isimlendirme).
    const [Surname, setSurname] = useState('');
    const [UserName, setUsername] = useState('');
    const [Email, setEmail] = useState('');
    const [PhoneNumber, setPhone] = useState('');
    const [Address, setAddress] = useState(''); // `adress` yerine `address` yazımı düzeltildi.
    const [Password, setPassword] = useState('');
    const [message, setmessage] = useState('');
    const confirmPasswordRef = useRef(); // Ref için düzgün bir isim kullanıldı.
    const navigate = useNavigate();
    const { t } = useTranslation("registertable");
    const handleRegister = async (e) => {
        e.preventDefault();
        setmessage('');
            const confirmPassword = confirmPasswordRef.current.value; // Ref'ten değer doğru şekilde alınıyor.
            if (Password !== confirmPassword) {
                setmessage('Passwords do not match. Please try again.');
                return;
            }
            await axios.post("https://localhost:7197/api/Auth/Register", {
                Name,
                Surname,
                UserName,
                Email,
                Password,
                Address: Address || '', // Boşsa boş string olarak gönder
                PhoneNumber: PhoneNumber || '', // Boşsa boş string olarak gönder
            }).then(response => {
                if(response && response.status === 200){
                    console.log('Register successful:');
                    setmessage('Register successful!');
                    axios.post("https://localhost:7197/api/Auth/SendMail", Email, {
                        headers: {
                          "Content-Type": "application/json", // Bu başlık, verinin JSON formatında olduğunu belirtir
                        },
                      }).then(emailresponse => {
                        if(!emailresponse && emailresponse.status !==200){
                            setmessage("Something went wrong, please contact with modarators!!");
                            console.log("Something went wrong, please contact with modarators!!")
                        }
                        else{
                            console.log("Mail sended! Check your spam box!")
                        }
                    }).catch(error => {
                        console.log(error.response.data.error)
                    });
                    setTimeout(() => {
                        navigate('/Login')
                      }, 3000)
                }
            }).catch(error => {
                console.error('Register error:', error);
                setmessage(error.response?.data?.message || 'Register failed. Please try again.');
            });
    }

    const truePhoneNumber = (e) => {
        let newPhone = e.target.value.replace(/[^0-9]/g, '');  // Sadece sayıları alıyoruz
        newPhone = newPhone.replace(/^0/, '');
        if (newPhone.length > 10){
            newPhone = newPhone.slice(0, 10); 
            newPhone = newPhone.padEnd(10, ' ');
        }
        return newPhone;
    }

    const checkPhone = (e) => {
        const pnumber = truePhoneNumber(e);
        setPhone(pnumber);
    }

    return (
        <div className='registercontainer'>
            <form className='registerbody' onSubmit={handleRegister}>
                <div className='registertitle'>
                    <BookIcon style={{ fontSize: '2.6rem' }} />
                    <p className='h1'>{t("register")}</p>
                    <hr style={{ height: "0px", border: "none", borderTop: "4px solid black", borderRadius: "3rem", width: "50%" }} />
                </div>
                <div className='registerinputs'>
                    <div className='reginputstwopart'>
                        <TextField
                            sx={{ width: "48%" }}
                            type='text'
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            label={t("name")}
                            variant="standard"
                            required
                        />
                        <TextField
                            sx={{ width: "48%" }}
                            type='text'
                            value={Surname}
                            onChange={(e) => setSurname(e.target.value)}
                            label={t("surname")}
                            variant="standard"
                            required
                        />
                    </div>
                    <div className='reginputstwopart'>
                        <TextField
                            sx={{ width: "48%" }}
                            type='text'
                            value={UserName}
                            onChange={(e) => setUsername(e.target.value)}
                            label={t("username")}
                            variant="standard"
                            required
                        />
                        <TextField
                            sx={{ width: "48%" }}
                            type='email'
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            label={t("email")}
                            variant="standard"
                            required
                        />
                    </div>
                    <div className='reginputstwopart'>
                        <TextField
                            sx={{ width: "48%" }}
                            type='tel'
                            value={PhoneNumber}
                            onChange={checkPhone}
                            label={t("phonenum")}
                            variant="standard"
                            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                        />
                        <TextField
                            sx={{ width: "48%" }}
                            type='text'
                            value={Address}
                            onChange={(e) => setAddress(e.target.value)}
                            label={t("address")}
                            variant="standard"
                        />
                    </div>
                    <div className='reginputstwopart'>
                        <TextField
                            sx={{ width: "48%" }}
                            type='password'
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            label={t("pass")}
                            variant="standard"
                            required
                        />
                        <TextField
                            sx={{ width: "48%" }}
                            inputRef={confirmPasswordRef}
                            type='password'
                            label={t("confpass")}
                            variant="standard"
                            required
                        />
                    </div>
                </div>
                {message && <p className="error-message" style={{ color: 'red' }}>{message}</p>}
                <Button sx={{backgroundColor:"black"}} className='loginbutton' type="submit" variant="contained">{t("regbutton")}</Button>
                <b>{t("registertext")} <button onClick={() => navigate('/Login')} className='btn btn-link'>{t("logintext")}</button></b>
            </form>
        </div>
    );
};

export default Register;
