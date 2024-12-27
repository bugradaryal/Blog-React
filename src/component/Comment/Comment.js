import React from 'react';
import './Comment.css';
import PersonIcon from '@mui/icons-material/Person';
const Comment = ({id,userName,content}) => {
    return (
        <div className='comment'>
        <div className='commentheader'>
            <PersonIcon style={{fontSize:"2.6rem"}}/>
            <p>{userName}</p>
        </div>
        <p className='commentcontent'>{content}</p>
    </div>
    );
};

export default Comment;