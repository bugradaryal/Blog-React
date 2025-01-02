import React, { useEffect, useState } from 'react';
import './PostManager.css';
import Post from '../../../../models/Post';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Comment from '../../../../models/Comment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { format, set } from 'date-fns';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Modal from '@mui/material/Modal';  // Modal'ı içeri aktar
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Textarea from '@mui/joy/Textarea';

const PostManager = () => {
      const [pagenumber, setpagenumber] = useState(1);
      const [postcount, setpostcount] = useState(0);
      const [allposts, setallposts] = useState([]);
      const [selectedData, setSelectedData] = useState(null);  // Seçilen veri
      const [commentmodalopen, setcommentmodalopen] = useState(false);
      const handlecommentOpen = (data) => {
        setSelectedData(data);
        setcommentmodalopen(true);  // Modal'ı açma fonksiyonu
      }
      const handlecommentClose = () => setcommentmodalopen(false); // Modal'ı kapama fonksiyonu
      const navigate = useNavigate();
    useEffect(()=>{
            PostDataAxios(1);
            axios.get("https://localhost:7197/api/Post/GetPostCounts").then(response => {
                response ? setpostcount(response.data) : setpostcount(0);
              });
    },[]);
    const PostDataAxios = async(pageid) => {
        try{
            const token = localStorage.getItem("authorization"); 
            if(token){
                axios.post("https://localhost:7197/api/Admin/GetAllPostForModerator",
                    pageid,
                    {
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                    },
                    }).then(response => {
                        if(response && response.status === 200){
                            setallposts(response.data);
                        }
                    }).catch(error =>{
                        console.error(error.response.data);
                    });
            }
            else{
                navigate('/');
            }
        }
        catch(error){
          console.error(error.response.data.errors);
        }
      }
    const GetPostByPage = async(updown) => {
        console.log(postcount)
        let maxpage = 1;
        if(postcount > 10){
          maxpage = Math.floor(postcount/10);
          if(postcount%10 !== 0){
            maxpage++;
          }
        }
        if(updown){
          const newPageNumber = pagenumber + 1;
          if(newPageNumber<=maxpage){
            PostDataAxios(newPageNumber);
            setpagenumber(newPageNumber);
            console.log("asfasfas")
          }
        }
        else{
          if(pagenumber > 1){
            const newPageNumber = pagenumber - 1;
            PostDataAxios(newPageNumber);
            setpagenumber(newPageNumber);
          }
        }
      }
    const deletepost = async(e,postId) => {
        const token = localStorage.getItem("authorization"); 
        if(token){
            e.preventDefault();
            axios.delete("https://localhost:7197/api/Admin/RemovePost",
                {
                    data: {postId: postId},
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    }
                }
            ).then(response => {
                if(response && response.status === 200){
                    setallposts(allposts.filter(post => post.id !== postId));
                }
                else{
                    console.log("Cant remove post!!")
                }
            }).catch(error => {
                console.error(error.response.data);
            });
        }
        else{
            navigate('/')
        }
    }
    const updatepost = async() => {
        const token = localStorage.getItem("authorization"); 
        if(token){
            console.log(selectedData)
            axios.put("https://localhost:7197/api/Admin/UpdatePost",{
                Id: selectedData.id,
                Title: selectedData.title,
                Content: selectedData.content,
                Image: selectedData.image
            },
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            }).then(response => {
                    if(response && response.status === 200){
                        console.log("Update Done!!")
                        handlecommentClose();
                        setallposts(prevPosts =>
                            prevPosts.map(post =>
                                post.id === selectedData.id
                                    ? { ...post, ...selectedData } // Seçilen postu güncelle
                                    : post // Diğer postlar değişmeden kalsın
                            )
                        );
                    }
                }).catch(error => {
                    console.error(error.response.data)
                });
        }
        else{
            navigate('/');
        }
    }

    return (
        <div className='postmanagercontainer'>
            <Modal
                open={commentmodalopen}
                onClose={handlecommentClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description">
                <Box className="myupdatemodal">
                <TextField onChange={(e) => setSelectedData(prevData => ({ ...prevData, title: e.target.value }))} value={selectedData ? selectedData.title : ""} label="Title" variant="outlined" />
                <TextField onChange={(e) => setSelectedData(prevData => ({ ...prevData, content: e.target.value }))} value={selectedData ? selectedData.content : ""} multiline minRows={3} maxRows={6} name="Content" label="Content" variant="outlined" />
                <Button onClick={updatepost} sx={{backgroundColor:"black"}} className='w-25' variant="contained" size='large'>Update</Button>
                </Box>
            </Modal>
            <div className='postmanagerbody'>
            <div className='managerheader'>
                <Button sx={{backgroundColor:"black", color:"white"}} size='large' variant="outlined">Add New Post</Button>
            </div>
            <TableContainer style={{backgroundColor:"transparent", padding:"2rem"}} className='postmanagertable' component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="left"><b>Post Id</b></TableCell>
                    <TableCell align="left"><b>Title</b></TableCell>
                    <TableCell align="left"><b>Date</b></TableCell>
                    <TableCell align="right"><b>Actions-Etc</b></TableCell>
                </TableRow>
                </TableHead>
                    <TableBody>
                    { allposts.map((row) => (
                        <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.id}
                        </TableCell>
                        <TableCell align="left">{row.title.substring(0,120)}</TableCell>
                        <TableCell align="left">{format(row.date, 'dd/MM/yyyy - hh:mm')}</TableCell>
                        <TableCell align="right" sx={{display:"flex",gap:"0.6rem"}}>
                        <Button onClick={()=>handlecommentOpen(row)} sx={{backgroundColor:"lightblue"}} size="small" variant="outlined">Edit</Button>
                        <Button onClick={(e) => deletepost(e, row.id)} sx={{backgroundColor:"#ec5353"}} size="small" variant="outlined">Delete</Button> 
                        <Button sx={{backgroundColor:"whitesmoke"}} size="small" variant="outlined">Comments</Button>     
                        </TableCell>              
                        </TableRow>
                    ))}
                    </TableBody>
            </Table>
            </TableContainer>
            <div className='postnumber'>
                <Button onClick={() => GetPostByPage(false)} variant="text"><ArrowBackIcon/></Button>{pagenumber}<Button onClick={() => GetPostByPage(true)} variant="text"><ArrowForwardIcon/></Button>
            </div>
            </div>
        </div>
    );
};

export default PostManager;