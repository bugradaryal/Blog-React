import React from 'react';
import BodyImage from '../../BodyImage/BodyImage';
import './HomePage.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const HomePage = ({post,UserId}) => {
  const posts = Array.isArray(post) 
  ? post.map((x) => <BodyImage key={x.id} Title={x.Title} Image={x.Image} Content={x.Content.substr(0,220)} Like ={x.Like} UserId={UserId} CommentCount={x.Comment ? x.Comment.length : 0}/>) 
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
      </div>
    );
};

export default HomePage;