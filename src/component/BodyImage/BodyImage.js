import React, { useState, useEffect } from 'react';
import './BodyImage.css';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import MessageIcon from '@mui/icons-material/Message';

const BodyImage = ({Title,Image,Content,Like,UserId,CommentCount}) => {
    const [likecount, setlikecount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    useEffect(() => {
        if (Like) {
          setlikecount(Like.length);
          if(Like.some(like => like.user_id === UserId)){
            setIsLiked(true);
            }
        }
      }, []); 


    if(!Image || Image === 0 || Image === null){
        Image ='./images/noimage.png';
    }
    return (
        <div className="liste" >
            <div className='text-center'>
                <p className='h5'> {Title}</p>
            </div>
            <hr></hr>
            <div className='imagecontainer'>
                <img alt='Image' className='imageclass' src= {Image} loading="lazy"/>    
            </div>
            <hr></hr>
            <div>
                <p className='paragraph'>{Content}</p>
            </div>
            <div>
                <button type="button" className="btn btn-primary">Read</button>
            </div>
            <hr></hr>
            <div className='likecomment'>
                <p><MessageIcon/>: <b>{CommentCount}</b></p> <p id='likedislike'><ThumbUpAltIcon style={{color: isLiked ? "#3B71CA" : "black" }}/>: <b style={{color: isLiked ? "#3B71CA" : "black" }}>{likecount}</b></p>
            </div>
        </div>
    );
};

export default BodyImage;
