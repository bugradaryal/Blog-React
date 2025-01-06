import React, { useState, useEffect } from 'react';
import BodyImage from '../../BodyImage/BodyImage';
import './HomePage.css';
import Button from '@mui/material/Button';
import axios from 'axios';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Post from '../../../models/Post';
import Like from '../../../models/Like';
import Comment from '../../../models/Comment';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Category } from '@mui/icons-material';

const HomePage = ({UserId, UserName}) => {
  const [post, setpost] = useState(new Post('', ''));
  const [pagenumber, setpagenumber] = useState(1);
  const [postcount, setpostcount] = useState(0);
  const [searchvalue, setsearchvalue] = useState("");
  const [holdpost, setholdpost] = useState([]);
  const [category, setcategory] = useState();
  
  useEffect(() => {
    PostDataAxios(1);
    axios.get("https://localhost:7197/api/Post/GetPostCounts").then(response => {
      response ? setpostcount(response.data) : setpostcount(0);
    });
  },[]);
  const PostDataAxios = async(pageid) => {
    try{
      const response = await axios.get("https://localhost:7197/api/Post/GetAllPostsByIndex", {
        params: {
          CurrentPage: pageid,
          index: 4,
        },
      });
      if (response && response.data && Array.isArray(response.data))
      {
        const posts = response.data.map(postData => {
          const Category = postData.category.name;
          const likes = postData.likes ? postData.likes.map(likeData => new Like(likeData.id, likeData.user_id, likeData.post_id)) : [];
          const comments = postData.comments ? postData.comments.map(comData => new Comment(comData.id, comData.content, comData.userName)) : [];
          return new Post(
            postData.id,
            postData.title,
            postData.content,
            postData.date,
            postData.image,
            likes,
            comments,
            Category
          );
        });
        setholdpost(posts);
        setpost(posts);
      }
    }
    catch(error){
      console.log("Cant get post resources!   -   "+error)
    }
  }
  const GetPostByPage = async(updown) => {
    let maxpage = 1;
    if(postcount > 4){
      maxpage = Math.floor(postcount/4);
      if(postcount%4 !== 0){
        maxpage++;
      }
    }
    if(updown){
      const newPageNumber = pagenumber + 1;
      if(newPageNumber<=maxpage){
        PostDataAxios(newPageNumber);
        setpagenumber(newPageNumber);
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
  ? post.map((x) => <BodyImage key={x.id} Post={x} UserId={UserId} UserName={UserName}/>) 
  : <p>Loading...</p>;

  const postsearchbytitle = async(e) => {
    e.preventDefault();
    if(searchvalue !== ""){
      try{
        setpost(post.map(data => data.title === searchvalue));
      }
      catch(error){
        console.error(error.response.data)
      }
    }
    else{
      setpost(holdpost);
    }
  }
  const postbycategories = async(e) => {
    e.preventDefault();
    if(category !== "" || category !== "Default"){
      try{
        setpost(post.map(data => data.Category === category));
      }
      catch(error){
        console.error(error.response.data)
      }
    }
    else{
      setpost(holdpost);
    }
  }

    return (
      <div className="Main">
        <div className='hometitle'>
          <div className='headercomponent'>
            <div className='headertitle'>
              <p className='h2'>Discover Some Blogs</p>
            </div>
            <form className='headerimputs' onSubmit={postsearchbytitle}>
              {
              <TextField id="outlined-basic" onChange={(e) => setsearchvalue(e.target.value)} value={searchvalue} label="Search" variant="outlined" InputProps={{
                endAdornment: <Button type='submit' sx={{color:"black"}} variant="text"><SearchIcon/></Button>}}/>
            }
            </form>
          </div>
        </div>
        <div className='mybody'> 
          <form className='categories' onSubmit={postbycategories}>
          <Button sx={{color:"black"}} type='submit' onClick={(e)=>setcategory(e.target.value)} value="Default" variant="text">Default</Button>
          <Button sx={{color:"black"}} type='submit' onClick={(e)=>setcategory(e.target.value)} value="Personal" variant="text">Personal</Button>
          <Button sx={{color:"black"}} type='submit' onClick={(e)=>setcategory(e.target.value)} value="Travel" variant="text">Travel</Button>
          <Button sx={{color:"black"}} type='submit' onClick={(e)=>setcategory(e.target.value)} value="Lifestyle" variant="text">Lifestyle</Button>
          <Button sx={{color:"black"}} type='submit' onClick={(e)=>setcategory(e.target.value)} value="News" variant="text">News</Button>
          <Button sx={{color:"black"}} type='submit' onClick={(e)=>setcategory(e.target.value)} value="Marketing" variant="text">Marketing</Button>
          <Button sx={{color:"black"}} type='submit' onClick={(e)=>setcategory(e.target.value)}value="Sports"  variant="text">Sports</Button>
          <Button sx={{color:"black"}} type='submit' onClick={(e)=>setcategory(e.target.value)} value="Movies"  variant="text">Movies</Button>
          </form>
          <div className='bodyblogcontenttcontainer'>
            {posts}
          </div>
        </div>
        <div className='postnumber'>
        <Button onClick={() => GetPostByPage(false)} variant="text"><ArrowBackIcon/></Button>{pagenumber}<Button onClick={() => GetPostByPage(true)} variant="text"><ArrowForwardIcon/></Button>
        </div>
      </div>
    );
};

export default HomePage;