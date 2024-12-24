import './App.css';
import Login from './component/page/Login/Login';
import Register from './component/page/Register/Register';
import { Route, Routes, useNavigate } from 'react-router-dom'; 
import HomePage from './component/page/HomePage/HomePage';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, { useState } from 'react';
import DehazeIcon from '@mui/icons-material/Dehaze';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import CallIcon from '@mui/icons-material/Call';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AboutUs from './component/page/AboutUs/AboutUs';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import FaceIconM from '@mui/icons-material/Face';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EmailVerification from './component/page/EmailVerification/EmailVerification';
import ContactUs from './component/page/ContactUs/ContactUs';
import User from './models/User';
import Post from './models/Post';
import axios from 'axios';

function App() {
  const [user, setuser] = useState('');
  const [Post, setpost] = useState('');
  const [role, setrole] = useState('');
  const [message, setmessage] = useState('');
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // 'setOpen' burada tanımlanır
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const HandleOnLoading = async (e) => {
    e.preventDefault();
    setmessage('');

    const apiClient = axios.create({
      baseURL: "https://localhost:7197/api", // API'nin base URL'i
      timeout: 5000, // Timeout süresi
    });

    apiClient.interceptors.request.use(
      (config) => {
        // Eğer Authorization header'ı yoksa, localStorage'dan token al ve ekle
        if (!config.headers.Authorization) {
          const token = localStorage.getItem("authorization");
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Home', 'Login', 'About Us', 'Contact Us'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => {
              // Sayfa geçişi yapılır
              if (text === 'Home') navigate('/');
              if (text === 'Login') navigate('./Login'); // Gerekirse yeni bir sayfa ekleyin
              if (text === 'About Us') navigate("/AboutUs");
              if (text === 'Contact Us') navigate('/ContactUs'); // Gerekirse yeni bir sayfa ekleyin
            }}>
              <ListItemIcon>
                  {index % 4 === 0 ? <HomeIcon /> : index % 4 === 1 ? <LoginIcon /> : index % 4 === 2 ? <AutoAwesomeMotionIcon /> : <CallIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Chart', 'Users', "Post Manager"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 3 === 0 ? <BarChartIcon /> : index % 3 === 1 ? <PeopleAltIcon /> : <PostAddIcon/>}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <div className="App">
      <div className='myheader'>
        <Button onClick={toggleDrawer(true)} className='btn btn-link text-decoration-none homebutton'><p className='h1 text-dark'><DehazeIcon/></p></Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
        <div className='profile'>
          <Button variant='text' style={{color:"black"}}><KeyboardArrowDownIcon/></Button>
          <FaceIconM style={{ fontSize: '2.5rem' }}/>
         </div>
      </div>
      <div className='mybody'>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/Login' element={<Login/>} />     
          <Route path='/Register' element={<Register/>}/>
          <Route path='/EmailVerification' element={<EmailVerification/>}/>
          <Route path='/AboutUs' element={<AboutUs/>}/>
          <Route path='/ContactUs' element={<ContactUs/>}/>
        </Routes>
      </div>
      <div className='copyright'>
          <b>	CopyRight &copy;2024 Buğra Daryal</b>
          <div className='github'>
            <GitHubIcon/>
            <Link target="_blank" sx={{color:"black"}} href="https://github.com/bugradaryal" underline="hover">github.com/bugradaryal</Link>
          </div>
      </div>
    </div>
  );
  }
}
export default App;
