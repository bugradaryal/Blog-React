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
import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import User from './models/User';
import Post from './models/Post';
import { jwtDecode } from 'jwt-decode';

function App() {
  const [user, setuser] = useState(new User('', ''));
  const [post, setpost] = useState(new Post('', ''));
  const [role, setrole] = useState('');
  const [message, setmessage] = useState('');
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // 'setOpen' burada tanımlanır
  const [loading, setLoading] = useState(true);

  const apiClient = axios.create({
    baseURL: "https://localhost:7197/api", // API'nin base URL'i
    timeout: 5000, // Timeout süresi
    headers: {"Content-Type":"application/json"}
  });

  function isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);  // Token'ı çözümle
      const expirationDate = decoded.exp * 1000;  // Exp tarihini milisaniyeye çevir
      return expirationDate < Date.now();  // Exp tarihinin geçmiş olup olmadığını kontrol et
    } catch (error) {
      console.error('Geçersiz token:', error);
      return true;  // Eğer token geçersizse, expired olarak kabul edebiliriz
    }
  }
  useEffect(() => {
    setLoading(true);
    apiClient.get('/Post/GetAllPosts')
      .then(response => {
        setpost(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
  }, []);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  apiClient.interceptors.request.use(
    async (config) => {
      setmessage('');
        // Eğer Authorization header'ı yoksa, localStorage'dan token al ve ekle
          let token = localStorage.getItem("authorization"); 
          console.log("first1")    
          if (!token || isTokenExpired(token)) 
          {        
            console.log("first3")   
            const refleshtoken = localStorage.getItem("refreshToken");
            if(!refleshtoken)
            {
              console.log("first4")   
              navigate('/Login');
            }
            else
            {
              console.log("first5"); 
              let RefResponse = null; 
              try{
                RefResponse = await axios.post("https://localhost:7197/api/Auth/RefreshToken",
                {},
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'RefreshToken': refleshtoken,
                  },
                }
              );
            }
            catch(error){
              console.log(error)
            }
              console.log("first5")
              if(RefResponse && RefResponse.status === 200){
                console.log("first6")   
                const jwtToken = RefResponse.headers['authorization']; 
                const refreshToken = RefResponse.headers['refreshtoken'];
                if (jwtToken && refreshToken) 
                {
                  localStorage.setItem('authorization', jwtToken);
                  localStorage.setItem('refreshToken', refreshToken);
                  console.log("first7")   
                } 
                else
                {
                  console.error('Cant get token!');
                  navigate('/Login');
                  console.log("first8")   
                }                
              }
              else{
                console.log("first9")   
                localStorage.removeItem("refreshToken");
                console.error('Reflesh Token not valid!!');
                navigate('/Login');
              }
            }         
          } 
          token = localStorage.getItem("authorization"); 
          if(localStorage.getItem("authorization") ){
            console.log("test")
            let Authresponse = null;
            try{
              Authresponse = await axios.post("https://localhost:7197/api/Auth/ValidateToken",
              {user},
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : token,
                },
              } 
            );
            }
            catch(error){
              console.log(error)
            }
            console.log(Authresponse)
            if(!Authresponse.status === 200){
              localStorage.removeItem("authorization");
            }
            console.log("first2")  
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
export default App;
