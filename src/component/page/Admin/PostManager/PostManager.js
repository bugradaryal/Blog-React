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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from "react-i18next";

const PostManager = () => {
      const [pagenumber, setpagenumber] = useState(1);
      const [postcount, setpostcount] = useState(0);
      const [allposts, setallposts] = useState([]);
      const [selectedData, setSelectedData] = useState({});  // Seçilen veri
      const [editmodalopen, seteditmodalopen] = useState(false);
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    // Canvas oluşturuluyor
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
    
                    // Resmi JPEG formatında base64 olarak alıyoruz
                    const jpegBase64 = canvas.toDataURL("image/jpeg");
                    setSelectedData((prevData) => ({ ...prevData, image: jpegBase64 }));
                };
                img.src = event.target.result;  // base64 verisini yükle
            };
            reader.readAsDataURL(file);  // Dosyayı base64 formatında oku
        }
    };

      const handleeditOpen = (data) => {
        console.log(data)
        setSelectedData(data);
        seteditmodalopen(true);  // Modal'ı açma fonksiyonu
      }
      const handleeditClose = () => seteditmodalopen(false); // Modal'ı kapama fonksiyonu
    

      const navigate = useNavigate();
    useEffect(()=>{
            PostDataAxios(1);
            axios.get("https://localhost:7197/api/Post/GetPostCounts").then(response => {
                response ? setpostcount(response.data) : setpostcount(0);
              }).catch(error =>{
                console.error(error.response.data);
              });
    },[]);
    const PostDataAxios = async(pageid) => {
            const token = localStorage.getItem("authorization"); 
            if(token){
                axios.get("https://localhost:7197/api/Post/GetAllPostsByIndex",
                    {
                        params: {
                            CurrentPage: pageid,
                            index: 10,
                        },
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token,
                    },
                    }).then(response => {
                        if(response && response.status === 200){
                            console.log(response.data)
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
                Image: selectedData.image.split(',')[1] || "",
                Category: selectedData.categories.name
            },
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            }).then(response => {
                    if(response && response.status === 200){
                        console.log("Update Done!!")
                        handleeditClose();
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

    const byteToImageUrl = (base64String) => {
        if (!base64String.startsWith('data:image/jpeg;base64,')) {
            return `data:image/jpeg;base64,${base64String}`;
        }
        return base64String;
    };
    const { t } = useTranslation("admintable");
    return (
        <div className='postmanagercontainer'>
            <Modal
                open={editmodalopen}
                onClose={handleeditClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description">
                <Box className="myupdatemodal">
                <TextField inputProps={{ maxLength: 250 }} onChange={(e) => setSelectedData(prevData => ({ ...prevData, title: e.target.value }))} value={selectedData ? selectedData.title : ""} label={t("title")} variant="outlined" />
                <TextField inputProps={{ maxLength: 1600 }} onChange={(e) => setSelectedData(prevData => ({ ...prevData, content: e.target.value }))} value={selectedData ? selectedData.content : ""} multiline minRows={3} maxRows={6} name="Content" label={t("content")} variant="outlined" />
                <FormControl fullWidth variant="outlined" sx={{ width:"30%" }}>
                <InputLabel id="demo-simple-select-label">{t("category")}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedData.categories ? selectedData.categories.name : ""}
                    onChange={(e) => setSelectedData(prevData => ({ ...prevData, categories: {name: e.target.value }}))}
                    label={t("category")} // Bu, InputLabel ile eşleşmeli
                >
                    <MenuItem value={"Personal"}>{t("Personal")}</MenuItem>
                    <MenuItem value={"Travel"}>{t("Travel")}</MenuItem>
                    <MenuItem value={"Lifestyle"}>{t("Lifestyle")}</MenuItem>
                    <MenuItem value={"News"}>{t("News")}</MenuItem>
                    <MenuItem value={"Marketing"}>{t("Marketing")}</MenuItem>
                    <MenuItem value={"Sports"}>{t("Sports")}</MenuItem>
                    <MenuItem value={"Movies"}>{t("Movies")}</MenuItem>
                </Select>
                </FormControl>
                <input onChange={handleImageChange} type="file" accept="image/*"/>
                {selectedData.image ? (
                <img
                    src={byteToImageUrl(selectedData.image)}
                    alt="Preview"
                    style={{ width: "20%", marginTop: "1rem" }}
                />
                ): t("noimage")}
                <Button onClick={updatepost} sx={{backgroundColor:"black"}} className='w-25' variant="contained" size='large'>{t("updatebutton")}</Button>
                </Box>
            </Modal>
            <div className='postmanagerbody'>
            <div className='managerheader'>
                <Button onClick={(e) => navigate('/Admin/AddPost')} sx={{backgroundColor:"black", color:"white"}} size='large' variant="outlined">{t("addpostbutton")}</Button>
            </div>
            <TableContainer style={{backgroundColor:"transparent", padding:"2rem"}} className='postmanagertable' component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="left"><b>PostId</b></TableCell>
                    <TableCell align="left"><b>{t("title")}</b></TableCell>
                    <TableCell align="left"><b>{t("date")}</b></TableCell>
                    <TableCell align="left"><b>{t("category")}</b></TableCell>
                    <TableCell align="right"><b>{t("actions")}</b></TableCell>
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
                        <TableCell align="left">{row.date && !isNaN(new Date(row.date)) ? format(new Date(row.date), 'dd/MM/yyyy - hh:mm') : 'Invalid Date'}</TableCell>
                        <TableCell align="left">{row.categories.name}</TableCell>
                        <TableCell align="right" sx={{display:"flex",gap:"0.6rem"}}>
                        <Button onClick={()=>handleeditOpen(row)} sx={{backgroundColor:"lightblue"}} size="small" variant="outlined">{t("manageredit")}</Button>
                        <Button onClick={(e) => deletepost(e, row.id)} sx={{backgroundColor:"#ec5353"}} size="small" variant="outlined">{t("managerdelete")}</Button> 
                        <Button onClick={(e) => navigate('/Admin/ManageComments', {
                            state: {
                            Comments: row.comments,
                        },})} sx={{backgroundColor:"whitesmoke"}} size="small" variant="outlined">{t("managercomment")}</Button>     
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