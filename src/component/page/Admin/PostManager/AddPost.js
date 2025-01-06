import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './AddPost.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const AddPost = () => {
    const [newpost,setnewpost] = useState({
        Title:  "",
        Content: "",
        Image: null,
        Category:""
    });
    const [message,setmessage] = useState();
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState(null);
    const addpost = async(e) => {
        e.preventDefault();
        const token = localStorage.getItem("authorization"); 
        if(token){
            axios.post("https://localhost:7197/api/Admin/AddPost",
                {
                    Title: newpost.Title,
                    Content: newpost.Content,
                    Category: newpost.Category,
                    Image: newpost.Image ? Array.from(newpost.Image) : "",
                },
                {
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    }
                }
            ).then(response => {
                if(response && response.status === 200){
                    console.log("Post added!");
                    setmessage("Post added!");
                }
            }).catch(error => {
                console.error(error.response.data)
            });
        }
        else{
            navigate('/')
        }
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file); // Geçici URL oluştur
          setPreviewImage(imageUrl); // Önizleme için URL'yi set et

        // Resmi byte array'e dönüştür ve state'e kaydet
        const reader = new FileReader();
        reader.onload = () => {
            const arrayBuffer = reader.result; // ArrayBuffer olarak okunmuş veri
            const bytes = new Uint8Array(arrayBuffer); // Byte array'e dönüştür
            setnewpost((prevData) => ({ ...prevData, Image: bytes }));
        };
        reader.readAsArrayBuffer(file); // Dosyayı ArrayBuffer olarak oku
        }
    };

    return (
        <div className='addpostcontainer'>
            <div className='addpostbody'>
                <TextField inputProps={{ maxLength: 250 }} onChange={(e) => setnewpost(prevData => ({ ...prevData, Title: e.target.value }))} multiline minRows={2} maxRows={3} label="Title" variant="outlined" />
                <TextField inputProps={{ maxLength: 1600 }} onChange={(e) => setnewpost(prevData => ({ ...prevData, Content: e.target.value }))} multiline minRows={6} maxRows={15} name="Content" label="Content" variant="outlined" />
                <FormControl fullWidth variant="outlined" sx={{ width:"30%" }}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={newpost.Category}
                    onChange={(e) => setnewpost(prevData => ({ ...prevData, Category: e.target.value }))}
                    label="Category" // Bu, InputLabel ile eşleşmeli
                >
                    <MenuItem value={"Personal"}>Personal</MenuItem>
                    <MenuItem value={"Travel"}>Travel</MenuItem>
                    <MenuItem value={"Lifestyle"}>Lifestyle</MenuItem>
                    <MenuItem value={"News"}>News</MenuItem>
                    <MenuItem value={"Marketing"}>Marketing</MenuItem>
                    <MenuItem value={"Sports"}>Sports</MenuItem>
                    <MenuItem value={"Movies"}>Movies</MenuItem>
                </Select>
                </FormControl>
                <input onChange={handleImageChange} type="file" accept="image/*"/>
                {previewImage && (
                <img
                    src={previewImage}
                    alt="Preview"
                    style={{ width: "20%", marginTop: "1rem" }}
                />
                )}
                <b className='text-danger'>{message}</b>
                <Button onClick={addpost}  sx={{backgroundColor:"black"}} className='w-25' variant="contained" size='large'>Add Post</Button>
            </div>
        </div>
    );
};

export default AddPost;