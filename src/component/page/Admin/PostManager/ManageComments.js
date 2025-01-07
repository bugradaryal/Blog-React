import React, { useEffect, useState } from 'react';
import './ManageComments.css';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import format from 'date-fns/format';
import { useTranslation } from "react-i18next";

const ManageComments = () => {
    const location = useLocation();
    const { state } = location;
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        setComments(state.Comments);
    },[])

    const deletecomment = async(e,commentId) => {
        const token = localStorage.getItem("authorization"); 
        if(token){
            e.preventDefault();
            axios.delete("https://localhost:7197/api/Admin/DeleteCommentFromPost",
                {
                    params: {commentId: commentId},
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    }
                }
            ).then(response => {
                if(response && response.status === 200){
                    setComments(comments.filter(comment => comment.id !== commentId));
                }
                else{
                    console.log("Cant remove comment!!")
                }
            }).catch(error => {
                console.error(error.response.data);
            });
        }
        else{
            navigate('/')
        }
    }
    const { t } = useTranslation("admintable");
    return (
        <div className='managecommcontainer'>
            <div className='managecommbody'>
                <div className='managecommheader'>
                    <Button onClick={() => navigate("/Admin/PostManager")} style={{color:"black"}} variant="text"><CloseIcon sx={{fontSize:"2.5rem"}}/></Button>
                </div>
                <div>
                <TableContainer component={Paper} style={{backgroundColor:"transparent", padding:"2rem"}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="left"><b>{t("username")}</b></TableCell>
                        <TableCell align="left"><b>{t("content")}</b></TableCell>
                        <TableCell align="left"><b>{t("date")}</b></TableCell>
                        <TableCell align="right"><b>{t("actions")}</b></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {comments.length > 0 ? comments.map((row) => (
                        <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.userName}
                        </TableCell>
                        <TableCell align="left">{row.content.substring(0,50)}</TableCell>
                        <TableCell align="left">{row.date && !isNaN(new Date(row.date)) ? format(new Date(row.date), 'dd/MM/yyyy - hh:mm') : 'Invalid Date'}</TableCell>
                        <TableCell align="right"><Button onClick={(e) => deletecomment(e, row.id)} sx={{backgroundColor:"#ec5353"}} size="small" variant="outlined">{t("managerdelete")}</Button> </TableCell>
                        </TableRow>
                    )) : <p className='m-4'>{t("nocomment")}</p>}
                    </TableBody>
                </Table>
                </TableContainer>
                </div>
            </div>
        </div>
    );
};

export default ManageComments;