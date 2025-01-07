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
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from "react-i18next";
const Blog = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const [comments, setComments] = useState(state.Post.Comment || []);
    const [isLiked, setIsLiked] = useState(state.isLiked || false );
    const [Content, setcontent] = useState();
    const [likecount, setlikecount] = useState(state.Post.Like ? state.Post.Like.length : 0);
    const [commentcount, setcommentcount] = useState(state.Post.Comment ? state.Post.Comment.length : 0);
    const byteToImageUrl = (base64String) => {
        return `data:image/jpeg;base64,${base64String}`;
    };
    const [image, setimage] = useState(state.Post.Image && state.Post.Image !== 'AA==' ? byteToImageUrl(state.Post.Image) : './images/noimage.png');
    const writecoment = async(e) => {
        e.preventDefault();
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
                        setcommentcount(commentcount+1)
                        setcontent("");
                    }
                }).catch(error => {
                    console.error(error.response.data);
                });
            }
            else{
                navigate('/');
            }
    }
    const likedislike = async(e) => {
        e.preventDefault();
            const token = localStorage.getItem("authorization"); 
            if(token){
                const holdvalue = !isLiked;
                if(holdvalue){
                    await axios.post("https://localhost:7197/api/Post/LikeThePost",{
                        UserId: state.UserId,
                        PostId: state.Post.id
                    },
                    {
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
                    await axios.post("https://localhost:7197/api/Post/DislikeThePost", {
                            UserId: state.UserId,
                            PostId: state.Post.id
                        },
                        {
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
                navigate('/Login');
            }
    };
    const { t } = useTranslation("blogtable");
    return (
        <div className='blogcontainer'>  
            <div className='blogbody'>
            <div className='quitbutton'><Button onClick={(e) => navigate('/')} variant="text"><CloseIcon sx={{fontSize:"3rem", color:"black"}}/></Button></div>
                <div className='blogbodyheader'>
                    <div className='flextitle'>
                        <b className='blogtitle h2'>{state.Post.Title}</b>
                        <div className='d-flex flex-column'>
                            <p>{t("category")}: {state.Post.Category}</p>
                            <p>{t("date")}: {state.Post.Date && !isNaN(new Date(state.Post.Date)) ? format(new Date(state.Post.Date), 'dd/MM/yyyy - hh:mm') : 'Invalid Date'}</p>
                        </div>
                    </div>
                    <div className='blogimage'>
                        <img alt='Image' className='imageclass' src= {image} loading="lazy"/>    
                    </div>
                </div>
                <div className='blogcontent'>
                    <p>{state.Post.Content}</p>
                </div>
                <div className='blogbuttons'>
                <p style={{fontSize:"2.5rem"}}><MessageIcon style={{color: "black", fontSize:"2.5rem"}}/>: <b>{commentcount}</b></p> 
                <button disabled={state.UserId ? false : true} onClick={likedislike} style={{fontSize:"2.5rem",color:"black"}}><ThumbUpAltIcon style={{color: isLiked ? "#3B71CA" : "black", fontSize:"2.5rem"}}/>: <b style={{color: isLiked ? "#3B71CA" : "black" }}>{likecount}</b></button>
                </div>
                <div className='blogcomment'>
                    <b className='h2'>{t("comments")}:</b>
                    {Array.isArray(comments) ? comments.map(x => (<Comment key={x.id} userName={x.userName} content={x.content}/>)) : "No Comments!!"}
                </div>
                {state.UserId && (
                    <form className='writeblogcomment' onSubmit={writecoment}>
                        <Textarea onChange={(e) => setcontent(e.target.value)} minRows={2} maxRows={4} name="Content" value={Content} placeholder={t("commenttext")+"..."} variant="outlined" />
                        <Button type='submit' size="large" className='submitcomment' variant="outlined">{t("commentbutton")}</Button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Blog;