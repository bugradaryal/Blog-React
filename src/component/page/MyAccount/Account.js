import React, { useEffect, useState, useRef } from 'react';
import './Account.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Modal from '@mui/material/Modal';  // Modal'ı içeri aktar
import Box from '@mui/material/Box';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Account = ({user}) => {
    const navigate = useNavigate();
    const [getuser,setuser] = useState({});
    const [deletemodalopen, setdeletemodalopen] = useState(false);
    const handledeleteOpen = () => setdeletemodalopen(true);  // Modal'ı açma fonksiyonu
    const handledeleteClose = () => setdeletemodalopen(false); // Modal'ı kapama fonksiyonu
    const oldpassword = useRef("");
    const newpassword = useRef("");
    const confnewpassword = useRef("");
    const [passmessage, setpassmessage] = useState("");


    useEffect(() => {
        if (user) {
            setuser(user);
        }
    },[user]); 

    const deleteaccount = async()=>{
        handledeleteClose();
        const token = localStorage.getItem("authorization"); 
        if(token){
            try{
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
                });
            }
            catch(error){
                console.error(error.response.data.errors)
            }
        }
        else{
            navigate('/Login');
        }
    }

    const updateaccount = async(e) => {
        e.preventDefault();
        const token = localStorage.getItem("authorization"); 
        if(token){
            try{
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
                        //navigate('/');
                    }
                });
            }
            catch(error){
                console.error(error.response.data.errors)
            }
        }
        else{
            //navigate('/Login');
        }
    }

    const changepassword = async(e) => {
        e.preventDefault();
        const old_p = oldpassword.current.value;
        const new_p = newpassword.current.value;
        const conf_p = confnewpassword.current.value;
        if(new_p === conf_p){
            await axios.put();
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
                    <b>Your account will be deleted after this action. This process is irreversible!</b>
                    <Button onClick={deleteaccount} sx={{backgroundColor:"darkred"}} className='w-50' variant="contained" size='large'>Delete Account</Button>
                </Box>
            </Modal>
            <div className='accountbody'>
                <form className='topaccountbody' onSubmit={updateaccount} key={getuser.Id}>
                    <div className='accountcontents'>
                        <div className='accountfields'>
                        <TextField slotProps={{input: {readOnly: true}}}  type='email' value={getuser.Email} variant="standard" />
                        <TextField onChange={(e) => setuser(prevState => ({ ...prevState, UserName: e.target.value }))} type='text' value={getuser.UserName} variant="standard" />
                        <TextField onChange={(e) => setuser(prevState => ({ ...prevState, PhoneNumber: e.target.value }))} type='tel' value={getuser.PhoneNumber} label={!getuser.PhoneNumber ? "Phone Number" : ""} variant="standard" />
                        <TextField onChange={(e) => setuser(prevState => ({ ...prevState, Name: e.target.value }))} type='text' value={getuser.Name} variant="standard" />
                        <TextField onChange={(e) => setuser(prevState => ({ ...prevState, SurName: e.target.value }))} type='text' value={getuser.SurName} variant="standard" />
                        <TextField onChange={(e) => setuser(prevState => ({ ...prevState, Address: e.target.value }))} type='text' value={getuser.Address} label={!getuser.Address ? "Address" : ""} variant="standard" />
                        </div>
                        <div>
                            <AccountBoxIcon sx={{width:"100%", height:"100%"}}/>
                        </div>
                    </div>
                    <div className='accountbuttons'>
                    <Button type='submit' sx={{backgroundColor:"cornflowerblue"}} variant="contained" size='large'>Edit Account</Button>
                    <Button type='button' onClick={handledeleteOpen} sx={{backgroundColor:"darkred"}}  variant="contained" size='large'>Delete Account</Button>
                    </div>
                </form>
                <form className='bottomaccountbody' onSubmit={changepassword}>
                    <div className='d-flex flex-row justify-content-between w-100 gap-5'>
                        <TextField className='w-50' id="standard-basic" ref={oldpassword} label="Old Password" variant="standard" required/>
                        <TextField className='w-50' id="standard-basic" ref={newpassword} label="New Password" variant="standard" required/>
                    </div>
                    <div className='d-flex flex-row w-100 gap-5'>
                        <TextField className='w-50' id="standard-basic" ref={confnewpassword} label="Confirm New Password" variant="standard" required/>   
                        <div className='w-50'></div>
                    </div>
                    <b className='text-danger m-2'>{passmessage}</b>
                    <div className='w-25 mt-3'>
                        <Button type='submit' sx={{backgroundColor:"black"}} className='w-75' variant="contained" size='large'>Change Password</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Account;