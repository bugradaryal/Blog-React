import React from 'react';
import './BodyImage.css';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import MessageIcon from '@mui/icons-material/Message';

const BodyImage = ({name,image,content}) => {
    function ContentSubString(content) {
        const substring = content.substring(1,220);
        return substring;
    }

    return (
        <div className="liste" >
            <div className='text-center'>
                <p className='h5'> {name}</p>
            </div>
            <hr></hr>
            <div className='text-center'>
                <img className='imageclass' src= {'./images/' + image + '.jpg'} loading="lazy"/>    
            </div>
            <hr></hr>
            <div>
                <p className='paragraph'>{ContentSubString(content)}</p>
            </div>
            <div>
            <button type="button" class="btn btn-primary">Read</button>
            </div>
            <hr></hr>
            <div className='likecomment'>
                <p><MessageIcon/>: <b className='text-primary'>3</b></p> <p><ThumbsUpDownIcon/>: <b className='text-primary'>5</b></p>
            </div>
        </div>
    );
};

export default BodyImage;
