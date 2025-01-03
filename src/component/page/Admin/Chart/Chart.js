import React, { useEffect, useState } from 'react';
import './Chart.css';
import { LineChart } from '@mui/x-charts';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';

const Chart = () => {
    const navigate = useNavigate();
    const [poststat,setpoststat] = useState([]);
    const [commentstat,setcommentstat] = useState([]);
    const [likestat,setlikestat] = useState([]);
    const [usercount,setusercount] = useState(0);
    useEffect(()=>{
        const token = localStorage.getItem("authorization"); 
        if(token){
            axios.get("https://localhost:7197/api/Admin/GetAllStatistics",{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            }).then(response => {
                if(response && response.status === 200){
                    setpoststat(response.data.postStatics);
                    setcommentstat(response.data.commentStatics);
                    setlikestat(response.data.likeStatics);
                    setusercount(response.data.userCount);
                    console.log(response.data)
                }
            });
        }
        else{
            navigate('/')
        }
    },[]);
    return (
        <div className='chartcontainer'>
            <div className='chartbody'>
                <div className='chartflex'>
                    <div>
                        <b>Post Count Per Mouth</b>
                    <LineChart
                    xAxis={[{ data: poststat.length > 0 ? poststat.map(item => item.month) : [] }]}
                    series={[
                        {
                        data: poststat.length > 0 ? poststat.map(item => item.postCount) : [],
                        },
                    ]}
                    width={500}
                    height={300}
                    />
                    </div>
                    <div>
                        <b>Message Count Per Mouth</b>
                    <LineChart
                    xAxis={[{ data: commentstat.length > 0 ? commentstat.map(item => item.month) : [] }]}
                    series={[
                        {
                        data: commentstat.length > 0 ? commentstat.map(item => item.commentCount) : [],
                        },
                    ]}
                    width={500}
                    height={300}
                    />
                    </div>
                </div>
                <div className='chartflex'>
                    <div>
                        <b>Like Count Per Mouth</b>
                    <LineChart
                    xAxis={[{ data: likestat.length > 0 ? likestat.map(item => item.month) : [] }]}
                    series={[
                        {
                        data: likestat.length > 0 ? likestat.map(item => item.likeCount) : [],
                        },
                    ]}
                    width={500}
                    height={300}
                    />
                    </div>
                    <div className='chartusercount'>
                        <p className='counttext'> <PeopleIcon sx={{fontSize:"3rem"}}/><b>UserCount: {usercount}</b></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chart;