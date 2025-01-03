import React, { useState, useEffect } from 'react';
import './BodyImage.css';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import MessageIcon from '@mui/icons-material/Message';
import { useNavigate } from 'react-router-dom';

const BodyImage = ({Post, UserId, UserName}) => {
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(false);
    const [image, setimage] = useState();

    const byteToImageUrl = (base64String) => {
        return `data:image/jpeg;base64,${base64String}`;
    };

    useEffect(() => {
        if(Post.Like && Post.Like.some(like => like.user_id === UserId)){
            setIsLiked(true);
        }
        setimage(Post.Image && Post.Image !== 'AA==' ? byteToImageUrl(Post.Image) : './images/noimage.png');
      }, []); 
      const handleSubmit = (e) => {
        e.preventDefault(); // Formun normal şekilde submit olmasını engelle
        navigate('/Blog', {
          state: {
            Post: Post,
            UserId: UserId,
            UserName: UserName,
            isLiked: isLiked,
          },
        });
      };

    return (
        <form className="liste" onSubmit={handleSubmit}>
            <div className='imagecontainer'>
                <img alt='Image' className='imageclass' src= {image} loading="lazy"/>    
            </div>
            <div className='contentcontainerforbody'>
                <div className='hr'></div>
                <div>
                    <p className='h5'> {Post.Title}</p>
                </div>
                <div>
                    <p className='paragraph mt-3'>{Post.Content.substr(0,220)}</p>
                </div>
                <div>
                    <button type="submit"  className="btn btn-primary readbutton">Read</button>
                </div>
                <div className='hr'></div>
                <div className='likecomment'>
                    <p><MessageIcon/>: <b>{Post.Comment ? Post.Comment.length : 0}</b></p> <p id='likedislike'><ThumbUpAltIcon style={{color: isLiked ? "#3B71CA" : "black" }}/>: <b style={{color: isLiked ? "#3B71CA" : "black" }}>{Post.Like ? Post.Like.length : 0}</b></p>
                </div>
            </div>
        </form>
    );
};

export default BodyImage;
