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
import { jwtDecode } from 'jwt-decode';
import Blog from './component/page/Blog/Blog';
import Users from './component/page/Admin/Users/Users';
import Modal from '@mui/material/Modal';  // Modal'ı içeri aktar
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Account from './component/page/MyAccount/Account';



function App() {
  const [user, setuser] = useState(new User('', ''));
  const [role, setrole] = useState('');
  const [message, setmessage] = useState('');
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // 'setOpen' burada tanımlanır
  const [loading, setLoading] = useState(true);
  const [modalopen, setmodalopen] = useState(false);


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

   const ValidateToken = async(token) => {
    try{
      const Authresponse = await axios.post("https://localhost:7197/api/Auth/ValidateToken",
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
        }).then(response => {
          if(!response.status === 200 || response.error){
            console.log("Token not valid!");
            localStorage.removeItem("authorization");
          } 
          else{
            const user = new User(response.data.user.id, response.data.user.userName, response.data.user.email);
            setuser(user);
            setrole(response.data.role);
            console.log("Valid token. Done!")
          }
        });
    }
    catch(error){
      localStorage.removeItem("authorization");
      console.log("Cant get auth resources!  -  "+ error)
    }
  }


  useEffect(() => {
    setLoading(true);
          const token = localStorage.getItem("authorization"); 
          if(token && !isTokenExpired(token)){
            console.log("Token exist!");
            ValidateToken(token);
          }
          else{
            console.log("Token not exist!")
            try{
              const refleshtoken = localStorage.getItem("refreshToken");
              if(refleshtoken)
                {
                  console.log("Reflesh token exist!");
                  const RefResponse = axios.post("https://localhost:7197/api/Auth/RefreshToken",
                    {},
                    {
                      headers: {
                        'Content-Type': 'application/json',
                        'RefreshToken': refleshtoken,
                      },
                    }
                  ).then(response => {
                    if(response && response.status === 200){  
                      const jwtToken = response.headers['authorization']; 
                      const refreshToken = response.headers['refreshtoken'];
                      console.log("Reflesh token valid!");
                      if (jwtToken && refreshToken) 
                      {
                        localStorage.setItem('authorization', jwtToken);
                        localStorage.setItem('refreshToken', refreshToken); 
                        console.log("Getting tokens. Done!");
                      } 
                      else
                      {
                        console.error('Cant get tokens!');
                      }                
                    }
                    else{  
                      localStorage.removeItem("refreshToken");
                      console.error('Reflesh Token not valid!!');
                    }
                  });
                }
                else{
                  console.log("Reflesh token not exist!");
                  console.log('User must be login!');
                }
            }
            catch(error){
              localStorage.removeItem("refreshToken");
              console.log("Cant get refleshtoken resources!   -   "+error);
            }
          }
      },[]);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleOpen = () => setmodalopen(true);  // Modal'ı açma fonksiyonu
  const handleClose = () => setmodalopen(false); // Modal'ı kapama fonksiyonu

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
            <ListItemButton onClick={() => {
              // Sayfa geçişi yapılır
              if (text === 'Users') navigate('/Admin/Users');
            }}>
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
  
  const logout = () => {
    setuser("","");
    setrole("");
    localStorage.removeItem("authorization");
    localStorage.removeItem("refreshtoken");
    handleClose();
    navigate('/Login');
  }

  return (
    <div className="App">
      <div className='myheader'>
        <Button onClick={toggleDrawer(true)} className='btn btn-link text-decoration-none homebutton'><p className='h1 text-dark'><DehazeIcon/></p></Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
        <div className='profile'>
          <Button variant='text' style={{color:"black"}} onClick={handleOpen}>
            <KeyboardArrowDownIcon/>
          </Button>
          <FaceIconM style={{ fontSize: '2.5rem' }}/>
         </div>
      </div>

      <Modal
        open={modalopen}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className="mymodal">
          <div>
             <PersonIcon/><button onClick={()=>navigate('/Account')} className='h5 modalbutton'>My Account</button>
          </div>
          <div>
            <LogoutIcon/><button onClick={logout} className='h5 modalbutton'>Log Out</button>
          </div>
        </Box>
      </Modal>

      <div className='mybody'>
        <Routes>
          <Route path='/' element={<HomePage UserId={user.Id} UserName={user.UserName}/>} />
          <Route path='/Blog' element={<Blog/>}/>
          <Route path='/Login' element={<Login/>} />     
          <Route path='/Register' element={<Register/>}/>
          {
            /*
            <Route path='/EmailVerification' element={<EmailVerification/>}/>
            */
          }     
          <Route path='/AboutUs' element={<AboutUs/>}/>
          <Route path='/ContactUs' element={<ContactUs/>}/>
          <Route path='/Account' element={<Account/>}/>
          {/*admin path*/}
          <Route path='/Admin/Users' element={<Users/>}/>
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
