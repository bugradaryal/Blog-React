import React, { useState, useEffect } from 'react';
import BodyImage from '../../BodyImage/BodyImage';
import './HomePage.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Post from '../../../models/Post';
import Like from '../../../models/Like';
import Comment from '../../../models/Comment';

const HomePage = ({UserId}) => {
  const [post, setpost] = useState(new Post('', ''));
  const [pagenumber, setpagenumber] = useState(1);
  const [postcount, setpostcount] = useState(0);
  
  useEffect(() => {
    PostDataAxios(1);
    axios.get("https://localhost:7197/api/Post/GetPostCounts").then(response => {
      response ? setpostcount(response.data) : setpostcount(0);
    });
  },[]);
  const PostDataAxios = async(pageid) => {
    try{
      const response = await axios.get("https://localhost:7197/api/Post/GetAllPosts", {
        params: {
          CurrentPage: pageid,
        },
      });
      if (response && response.data && Array.isArray(response.data))
      {
        const posts = response.data.map(postData => {
          const likes = postData.likes ? postData.likes.map(likeData => new Like(likeData.id, likeData.user_id, likeData.post_id)) : [];
          const comments = postData.comments ? postData.comments.map(comData => new Comment(comData.id, comData.content, comData.userName)) : [];
          return new Post(
            postData.id,
            postData.title,
            postData.content,
            postData.date,
            postData.image,
            likes,
            comments
          );
        });
        setpost(posts);
      }
    }
    catch(error){
      console.log("Cant get post resources!   -   "+error)
    }
  }
  const GetPostByPage = async(updown) => {
    console.log(postcount)
    let maxpage = 1;
    if(postcount > 8){
      maxpage = Math.floor(postcount/8);
      if(postcount%8 !== 0){
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
        <Button onClick={() => GetPostByPage(false)} variant="text"><ArrowBackIcon/></Button>{pagenumber}<Button onClick={() => GetPostByPage(true)} variant="text"><ArrowForwardIcon/></Button>
        </div>
      </div>
    );
};

export default HomePage;