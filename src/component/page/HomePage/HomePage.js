import React from 'react';
import BodyImage from '../../BodyImage/BodyImage';
import './HomePage.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const HomePage = () => {
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
          <BodyImage name={"Dog"} image={"dog"} content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non varius erat. Phasellus vel tempor libero. Aliquam porta eleifend dolor ut iaculis. Duis leo justo, pharetra a mauris quis, viverra tincidunt neque. Vestibulum elementum, tellus nec accumsan vestibulum, augue tortor commodo sapien, sit amet tristique libero erat vel velit. "}/>
          <BodyImage name={"Cat"} image={"cat"} content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non varius erat. Phasellus vel tempor libero. Aliquam porta eleifend dolor ut iaculis. Duis leo justo, pharetra a mauris quis, viverra tincidunt neque. Vestibulum elementum, tellus nec accumsan vestibulum, augue tortor commodo sapien, sit amet tristique libero erat vel velit. "}/>
          <BodyImage name={"Bird"} image={"bird"} content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non varius erat. Phasellus vel tempor libero. Aliquam porta eleifend dolor ut iaculis. Duis leo justo, pharetra a mauris quis, viverra tincidunt neque. Vestibulum elementum, tellus nec accumsan vestibulum, augue tortor commodo sapien, sit amet tristique libero erat vel velit. "}/>
          <BodyImage name={"Dog"} image={"dog"} content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non varius erat. Phasellus vel tempor libero. Aliquam porta eleifend dolor ut iaculis. Duis leo justo, pharetra a mauris quis, viverra tincidunt neque. Vestibulum elementum, tellus nec accumsan vestibulum, augue tortor commodo sapien, sit amet tristique libero erat vel velit. "}/>
          <BodyImage name={"Cat"} image={"cat"} content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non varius erat. Phasellus vel tempor libero. Aliquam porta eleifend dolor ut iaculis. Duis leo justo, pharetra a mauris quis, viverra tincidunt neque. Vestibulum elementum, tellus nec accumsan vestibulum, augue tortor commodo sapien, sit amet tristique libero erat vel velit. "}/>
          <BodyImage name={"Bird"} image={"bird"} content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non varius erat. Phasellus vel tempor libero. Aliquam porta eleifend dolor ut iaculis. Duis leo justo, pharetra a mauris quis, viverra tincidunt neque. Vestibulum elementum, tellus nec accumsan vestibulum, augue tortor commodo sapien, sit amet tristique libero erat vel velit. "}/>
          <BodyImage name={"Dog"} image={"dog"} content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non varius erat. Phasellus vel tempor libero. Aliquam porta eleifend dolor ut iaculis. Duis leo justo, pharetra a mauris quis, viverra tincidunt neque. Vestibulum elementum, tellus nec accumsan vestibulum, augue tortor commodo sapien, sit amet tristique libero erat vel velit. "}/>
          <BodyImage name={"Cat"} image={"cat"} content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non varius erat. Phasellus vel tempor libero. Aliquam porta eleifend dolor ut iaculis. Duis leo justo, pharetra a mauris quis, viverra tincidunt neque. Vestibulum elementum, tellus nec accumsan vestibulum, augue tortor commodo sapien, sit amet tristique libero erat vel velit. "}/>
        </div>
      </div>
    );
};

export default HomePage;