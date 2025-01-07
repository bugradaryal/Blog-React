import React, { useEffect, useState, useRef } from 'react';
import './Account.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Modal from '@mui/material/Modal';  // Modal'ı içeri aktar
import Box from '@mui/material/Box';
import axios from 'axios';
import { redirect, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const Account = ({user}) => {
    const navigate = useNavigate();
    const [getuser,setuser] = useState({});
    const [deletemodalopen, setdeletemodalopen] = useState(false);
    const handledeleteOpen = () => setdeletemodalopen(true);  // Modal'ı açma fonksiyonu
    const handledeleteClose = () => setdeletemodalopen(false); // Modal'ı kapama fonksiyonu
    const [passwords, setPasswords] = useState({
        oldpassword: "",
        newpassword: "",
        confnewpassword: "",
    });
    const [passmessage, setpassmessage] = useState("");
    const { t } = useTranslation("accounttable");

    useEffect(() => {
        if ( user && user.Id !== "") {
            console.log(user)
            setuser(user);
        }
        else{
            navigate('/');
        }
    },[user]); 

    const deleteaccount = async()=>{
        handledeleteClose();
        const token = localStorage.getItem("authorization"); 
        if(token){
                console.log(user)
                await axios.delete("https://localhost:7197/api/User/DeleteAccount",{
                    data: user.Id ,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    },
                }).then(response => {
                    if(response && response.status === 200){
                        localStorage.removeItem("authorization");
                        localStorage.removeItem("refreshToken");
                        setuser("");
                        navigate('/Login');
                    }
                }).catch(error => {
                    console.error(error.response.data)
                });
        }
        else{
            navigate('/Login');
        }
    }

    const updateaccount = async(e) => {
        e.preventDefault();
        const token = localStorage.getItem("authorization"); 
        if(token){
                await axios.put("https://localhost:7197/api/User/UpdateAccount",    
                    {...getuser},   
                    {         
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token,
                        }
                }).then(response => {
                    if(response && response.status === 200){
                        console.log("Updating account is done!");
                    }
                    else{
                        navigate('/');
                    }
                }).catch(error => {
                    console.error(error.response.data);
                });
        }
        else{
            navigate('/Login');
        }
    }

    const changepassword = async(e) => {
        e.preventDefault();
        const { oldpassword, newpassword, confnewpassword } = passwords;
        console.log(newpassword)
        console.log(confnewpassword)
        if(newpassword === confnewpassword){
            const token = localStorage.getItem("authorization"); 
            if(token){
                    await axios.put("https://localhost:7197/api/User/ChangePassword", 
                        {
                            user_id: getuser.Id,
                            oldpassword: oldpassword,
                            newpassword: newpassword,
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': token,
                            }
                        }
                    ).then(response => {
                        if(response && response.status === 200){
                            setpassmessage("Password Changed!!");
                        }
                        else{
                            setpassmessage("Password can't changed!!");
                        }
                    }).catch(error => {
                        console.error(error.response.data);
                    });
            }
            else{
                navigate("/");
            }
        }
        else{
            setpassmessage("Passwords not match!!");
            console.error("Passwords not match!!")
        }
    }


    return (
        <div className='accountcontainer'>
            <Modal
                open={deletemodalopen}
                onClose={handledeleteClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box className="mydeletemodal">
                    <b>{t("deletemodaltext")}</b>
                    <Button onClick={deleteaccount} sx={{backgroundColor:"darkred"}} className='w-50' variant="contained" size='large'>{t("deletebutton")}</Button>
                </Box>
            </Modal>
            <div className='accountbody'>
                <form className='topaccountbody' onSubmit={updateaccount} key={getuser.Id}>
                    <div className='accountcontents'>
                        <div className='accountfields'>
                        <TextField slotProps={{input: {readOnly: true}}}  type='email' value={getuser.Email} variant="standard" />
                        <TextField onChange={(e) => setuser(prevState => ({ ...prevState, UserName: e.target.value }))} type='text' value={getuser.UserName} variant="standard" />
                        <TextField onChange={(e) => setuser(prevState => ({ ...prevState, PhoneNumber: e.target.value }))} type='tel' value={getuser.PhoneNumber} label={!getuser.PhoneNumber ? t("phonenum") : ""} variant="standard" />
                        <TextField onChange={(e) => setuser(prevState => ({ ...prevState, Name: e.target.value }))} type='text' value={getuser.Name} variant="standard" />
                        <TextField onChange={(e) => setuser(prevState => ({ ...prevState, SurName: e.target.value }))} type='text' value={getuser.SurName} variant="standard" />
                        <TextField onChange={(e) => setuser(prevState => ({ ...prevState, Address: e.target.value }))} type='text' value={getuser.Address} label={!getuser.Address ? t("address") : ""} variant="standard" />
                        </div>
                        <div>
                            <AccountBoxIcon sx={{width:"100%", height:"100%"}}/>
                        </div>
                    </div>
                    <div className='accountbuttons'>
                    <Button type='submit' sx={{backgroundColor:"cornflowerblue"}} variant="contained" size='large'>{t("editaccountbutton")}</Button>
                    <Button type='button' onClick={handledeleteOpen} sx={{backgroundColor:"darkred"}}  variant="contained" size='large'>{t("deleteaccountbutton")}</Button>
                    </div>
                </form>
                <form className='bottomaccountbody' onSubmit={changepassword}>
                    <div className='d-flex flex-row justify-content-between w-100 gap-5'>
                        <TextField className='w-50' type='password' onChange={(e) => setPasswords({ ...passwords, oldpassword: e.target.value })} label={t("oldpass")} variant="standard" required/>
                        <TextField className='w-50' type='password' onChange={(e) => setPasswords({ ...passwords, newpassword: e.target.value })} label={t("newpass")} variant="standard" required/>
                    </div>
                    <div className='d-flex flex-row w-100 gap-5'>
                        <TextField className='w-50' type='password' onChange={(e) => setPasswords({ ...passwords, confnewpassword: e.target.value })} label={t("confpass")} variant="standard" required/>   
                        <div className='w-50'></div>
                    </div>
                    <b className='text-danger m-2'>{passmessage}</b>
                    <div className='w-25 mt-3'>
                        <Button type='submit' sx={{backgroundColor:"black"}} className='w-75' variant="contained" size='large'>{t("changepassbutton")}</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Account;