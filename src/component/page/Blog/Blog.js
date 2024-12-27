import React from 'react';
import './Blog.css'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import MessageIcon from '@mui/icons-material/Message';
import { useLocation } from 'react-router-dom';
import Comment from '../../Comment/Comment';
import { format } from 'date-fns';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/material/Button';
const Blog = () => {
    const location = useLocation();
    const { state } = location;
    const comment = Array.isArray(state.Post.Comment) ? state.Post.Comment.map(x => (<Comment key={x.id} userName={x.userName} content={x.content}/>)) : "No Comments!!";

    console.log(state.UserId)
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
                <p><MessageIcon style={{color: "black", fontSize:"2.5rem" }}/>: <b>{state.Post.Comment ? state.Post.Comment.length : 0}</b></p> <p id='likedislike'><ThumbUpAltIcon style={{color: state.isLiked ? "#3B71CA" : "black" , fontSize:"2.5rem" }}/>: <b style={{color: state.isLiked ? "#3B71CA" : "black"  }}>{state.Post.Like ? state.Post.Like.length : 0}</b></p>
                </div>
                <div className='blogcomment'>
                    <b className='h2'>Comments:</b>
                    {comment}
                </div>
                {state.UserId && (
                    <form className='writeblogcomment'>
                        <Textarea minRows={2} maxRows={4} name="Outlined" placeholder="Type in here…" variant="outlined" />
                        <Button size="large" className='submitcomment' variant="outlined">Submit</Button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Blog;