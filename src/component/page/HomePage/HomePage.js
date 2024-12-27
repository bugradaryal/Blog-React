import React, { useState, useEffect } from 'react';
import BodyImage from '../../BodyImage/BodyImage';
import './HomePage.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const HomePage = ({post,UserId}) => {
  const [postcount, setpostcount] = useState(1);
  useEffect(() => {
    axios.get("https://localhost:7197/api/Post/GetPostCounts").then(response => {
      response ? setpostcount(response.data > 8 ? response.data % 8 : 1) : setpostcount(1);
    });
  },[]);
  
  const posts = Array.isArray(post) 
  ? post.map((x) => <BodyImage key={x.id} Post={x} UserId={UserId}/>) 
  : <p>Loading...</p>;
    return (
      <div className="Main">
        <div className='hometitle'>
          <div className='headercomponent'>
            <div className='headertitle'>
              <p className='h2'>Discover Some Blogs</p>
            </div>
            <div className='headerimputs'>
              <TextField id="outlined-basic" sx={{
                      color:"black",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border:"2px solid yellow",
                        },
                        "&:hover fieldset": {
                          border:"2px solid white",
                        },
                        "&.Mui-focused fieldset": {
                          border:"2px solid white",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "white", // Varsayılan yazı rengi
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "white", // Focus (tıklanmış) durumundaki yazı rengi
                      },
                      "& .MuiInputLabel-root:hover": {
                        color: "white", // Hover durumundaki yazı rengi
                      },
              }} label="Search" variant="outlined" InputProps={{endAdornment: <Button sx={{
                color:"white",
              }} variant="text"><SearchIcon/></Button>}}/>
            </div>
          </div>
        </div>
        <div className='mybody'> 
          {posts}
        </div>
        <div className='postnumber'>
        <Button variant="text"><ArrowBackIcon/></Button>{postcount}<Button variant="text"><ArrowForwardIcon/></Button>
        </div>
      </div>
    );
};

export default HomePage;