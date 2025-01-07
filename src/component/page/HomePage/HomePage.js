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
import { useTranslation } from "react-i18next";

const HomePage = ({UserId, UserName}) => {
  const [post, setpost] = useState(new Post('', ''));
  const [pagenumber, setpagenumber] = useState(1);
  const [postcount, setpostcount] = useState(0);
  const [searchvalue, setsearchvalue] = useState("");
  const [holdpost, setholdpost] = useState([]);
  const [category, setcategory] = useState();
  const [isfilteder, setisfiltered] = useState(false);
  const { t } = useTranslation("homepagetable");
  useEffect(() => {
    PostDataAxios(1);
    axios.get("https://localhost:7197/api/Post/GetPostCounts").then(response => {
      response ? setpostcount(response.data) : setpostcount(0);
    }).catch(error => {
      console.error(error.response.data);
    });
  },[]);
  const PostDataAxios = async(pageid) => {
      await axios.get("https://localhost:7197/api/Post/GetAllPostsByIndex", {
        params: {
          CurrentPage: pageid,
          index: 4,
        },
      }).then(response => {
        if (response && response.data && Array.isArray(response.data))
        {
          const posts = response.data.map(postData => {
            const Category = postData.categories ? postData.categories.name : "";
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
      }).catch(error => {
        console.error(error.response.data);
      });

  }
  const GetPostByPage = async(updown) => {
    const dummyEvent = { preventDefault: () => {} };
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
        if(!isfilteder){
          PostDataAxios(newPageNumber);
        }
        else{
          postsearchbytitle(dummyEvent,newPageNumber);
        }
        setpagenumber(newPageNumber);
      }
    }
    else{
      if(pagenumber > 1){
        const newPageNumber = pagenumber - 1;
        if(!isfilteder){
          PostDataAxios(newPageNumber);
        }
        else{
          postsearchbytitle(dummyEvent,newPageNumber);
        }
        setpagenumber(newPageNumber);
      }
    }
  }

  const posts = Array.isArray(post) 
  ? post.map((x) => <BodyImage key={x.id} Post={x} UserId={UserId} UserName={UserName}/>) 
  : <p>Loading...</p>;

  const postsearchbytitle = async(e, index = 1) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    if (searchvalue !== "") {
      console.log(index)
      axios.get("https://localhost:7197/api/Post/GetPostBySearch",{
        params:{
          search:searchvalue,
          index: index
        }
      }).then(response => {
        if(response && response.status===200){
          const posts = response.data.map(postData => {
            const Category = postData.categories ? postData.categories.name : "";
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
          console.log(posts)
          setisfiltered(true);
          setpost(posts);
        }
        }
      ).catch(error => {
        console.error(error.response.data);
      });
    }
    else{
      setisfiltered(false);
      setpost(holdpost);
      setpagenumber(1);
    }
  }
  const postbycategories = async(e) => {
    e.preventDefault();
    const cpost = holdpost;
    setpagenumber(1);
    if(category !== "" && category !== "Default"){
      try{
        console.log(category)
        setpost(cpost.filter(data => data.Category === category));
      }
      catch(error){
        console.error(error.response.data)
      }
    }
    else{
      setpost(cpost)
    }
  }

    return (
      <div className="Main">
        <div className='hometitle'>
          <div className='headercomponent'>
            <div className='headertitle'>
              <p className='h2'>{t("blog")}</p>
            </div>
            <form className='headerimputs' onSubmit={postsearchbytitle}>
              {
              <TextField id="outlined-basic" onChange={(e) => setsearchvalue(e.target.value)} value={searchvalue} label={t("search")} variant="outlined" InputProps={{
                endAdornment: <Button type='submit' sx={{color:"black"}} variant="text"><SearchIcon/></Button>}}/>
            }
            </form>
          </div>
        </div>
        <div className='mybody'> 
          <form className='categories' onSubmit={postbycategories}>
          <Button sx={{color:"black"}} type='submit' onClick={(e)=>setcategory(e.target.value)} value="Default" variant="text">{t("Default")}</Button>
          <Button sx={{color:"black"}} type='submit' onClick={(e)=>setcategory(e.target.value)} value="Personal" variant="text">{t("Personal")}</Button>
          <Button sx={{color:"black"}} type='submit' onClick={(e)=>setcategory(e.target.value)} value="Travel" variant="text">{t("Travel")}</Button>
          <Button sx={{color:"black"}} type='submit' onClick={(e)=>setcategory(e.target.value)} value="Lifestyle" variant="text">{t("Lifestyle")}</Button>
          <Button sx={{color:"black"}} type='submit' onClick={(e)=>setcategory(e.target.value)} value="News" variant="text">{t("News")}</Button>
          <Button sx={{color:"black"}} type='submit' onClick={(e)=>setcategory(e.target.value)} value="Marketing" variant="text">{t("Marketing")}</Button>
          <Button sx={{color:"black"}} type='submit' onClick={(e)=>setcategory(e.target.value)}value="Sports"  variant="text">{t("Sports")}</Button>
          <Button sx={{color:"black"}} type='submit' onClick={(e)=>setcategory(e.target.value)} value="Movies"  variant="text">{t("Movies")}</Button>
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