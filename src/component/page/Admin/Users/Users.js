import React, { useEffect, useState, useRef } from 'react';
import './Users.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import User from '../../../../models/User';
import Button from '@mui/material/Button';
const Users = () => {
    const navigate = useNavigate();
    const [user,setuser] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("authorization"); 
        if(token){}
        else{
            navigate('/');
        }
        axios.post("https://localhost:7197/api/Admin/GetAllUsers",
            {},
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
              },
            }).then(response => {
                if(response && response.status){
                    setuser(response.data);
                    console.log(response.data)
                }
            });;
    },[]);

    const suspendUser = async(e,user_id,accountSuspended) => {
      e.preventDefault();
      const token = localStorage.getItem("authorization"); 
      if(token){
        const suspend = !accountSuspended;
        axios.post("https://localhost:7197/api/Admin/SuspendUser",null,{
          params: {
            userId: user_id,
            suspend: accountSuspended
        },
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
        }).then(response => {
          if(response && response.status === 200){
            setuser(prevuser => prevuser.map(u=> u.id === user_id ? {...u, accountSuspended: suspend} : u));
          }
        });
      }
      else{
        navigate('/');
      }
    }

    return (
        <div className='usercontainer'>
            <div className='userbody'>
    <TableContainer style={{backgroundColor:"transparent", padding:"2rem"}} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left"><b>UserId</b></TableCell>
            <TableCell align="left"><b>UserName</b></TableCell>
            <TableCell align="left"><b>E-mail</b></TableCell>
            <TableCell align="right"><b>Actions-Etc</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.userName}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="right"><Button onClick={(e) => suspendUser(e, row.id, row.accountSuspended)} size="small" style={{backgroundColor: !row.accountSuspended ? "lightgreen" : "#ec5353"}} variant="outlined">Suspend</Button></TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </div>
        </div>
    );
};

export default Users;