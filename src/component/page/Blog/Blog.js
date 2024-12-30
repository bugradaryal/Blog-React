import React, { useState } from 'react';
import './Blog.css'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import MessageIcon from '@mui/icons-material/Message';
import { useLocation, useNavigate } from 'react-router-dom';
import Comment from '../../Comment/Comment';
import { format } from 'date-fns';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/material/Button';
import axios from 'axios';
const Blog = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const [comments, setComments] = useState(state.Post.Comment || []);
    const [isLiked, setIsLiked] = useState(state.isLiked || false );
    const [Content, setcontent] = useState();
    const [likecount, setlikecount] = useState(state.Post.Like ? state.Post.Like.length : 0);
    const writecoment = async(e) => {
        e.preventDefault();
        try{
            const token = localStorage.getItem("authorization"); 
            if(token){
                await axios.post("https://localhost:7197/api/Comment/AddCommentToPost",{
                    user_id: state.UserId,
                    UserName:state.UserName,
                    post_id: state.Post.id,
                    Content: Content,
                },
                {
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': token,
                    },
                })
                .then(response => {
                    if(response && response.status === 200){
                        setComments([...comments, { userName: state.UserName, content: Content }]);
                        setcontent("");
                    }
                });
            }
            else{
                navigate('/');
            }
        }
        catch(error){
            console.error(error)
        }
    }
    const likedislike = async(e) => {
        e.preventDefault();
        try{
            const token = localStorage.getItem("authorization"); 
            if(token){
                const holdvalue = !isLiked;
                if(holdvalue){
                    console.log(state.UserId)
                    console.log(state.Post.id)
                    await axios.post("https://localhost:7197/api/Post/LikeThePost", null, {
                        params: {
                            userId: state.UserId,
                            postId: state.Post.id
                        },
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token,
                        },
                    }).then(response => {
                        if(response && response.status === 200){
                            setlikecount(likecount+1);
                            setIsLiked(true);  
                        }
                    }).catch(error => {
                        console.error("Error:", error);
                    });
                }
                else{
                    await axios.post("https://localhost:7197/api/Post/DislikeThePost", null, {
                        params: {
                            userId: state.UserId,
                            postId: state.Post.id
                        },
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token,
                        },
                    }).then(response => {
                        if(response && response.status === 200){
                            setlikecount(likecount-1);
                            setIsLiked(false);  
                        }
                    }).catch(error => {
                        console.error("Error:", error);
                    });
                }   
            }  
            else{
                navigate('/');
            }
        }
        catch(error){
            console.error(error);
        }
    };
    

    return (
        <div className='blogcontainer'>  
            <div className='blogbody'>
                <div className='blogbodyheader'>
                    <div className='flextitle'>
                        <b className='blogtitle h2'>{state.Post.Title}</b>
                        <p>Date: {format(state.Post.Date, 'dd/MM/yyyy')}</p>
                    </div>
                    <div className='blogimage'>
                        <img alt='Image' className='imageclass' src= './images/noimage.png' loading="lazy"/>    
                    </div>
                </div>
                <div className='blogcontent'>
                    <p>{state.Post.Content}</p>
                </div>
                <div className='blogbuttons'>
                <p style={{fontSize:"2.5rem"}}><MessageIcon style={{color: "black", fontSize:"2.5rem"}}/>: <b>{state.Post.Comment ? state.Post.Comment.length : 0}</b></p> 
                <button onClick={likedislike} style={{fontSize:"2.5rem"}}><ThumbUpAltIcon style={{color: isLiked ? "#3B71CA" : "black", fontSize:"2.5rem"}}/>: <b style={{color: isLiked ? "#3B71CA" : "black" }}>{likecount}</b></button>
                </div>
                <div className='blogcomment'>
                    <b className='h2'>Comments:</b>
                    {Array.isArray(comments) ? comments.map(x => (<Comment key={x.id} userName={x.userName} content={x.content}/>)) : "No Comments!!"}
                </div>
                {state.UserId && (
                    <form className='writeblogcomment' onSubmit={writecoment}>
                        <Textarea onChange={(e) => setcontent(e.target.value)} minRows={2} maxRows={4} name="Content" value={Content} placeholder="Type in here…" variant="outlined" />
                        <Button type='submit' size="large" className='submitcomment' variant="outlined">Submit</Button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Blog;