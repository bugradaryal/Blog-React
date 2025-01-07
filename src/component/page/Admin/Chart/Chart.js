import React, { useEffect, useState } from 'react';
import './Chart.css';
import { LineChart } from '@mui/x-charts';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateField } from '@mui/x-date-pickers/DateField'; // DateField'ı import edin
import validator from "validator";
import Button from '@mui/material/Button';
import { useTranslation } from "react-i18next";
const Chart = () => {
    const navigate = useNavigate();
    const [poststat, setpoststat] = useState([]);
    const [commentstat, setcommentstat] = useState([]);
    const [likestat, setlikestat] = useState([]);
    const [usercount, setusercount] = useState(0);
    const [enddate, setenddate] = useState(new Date());
    const [startdate, setstartdate] = useState(() => {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 1); // enddate'i startdate'den 1 yıl önce yap
        return date;
    });
    const isValidDate = (date) => {
        const minDate = new Date('1753-01-01T00:00:00Z');
        const maxDate = new Date('9999-12-31T23:59:59Z');
        const currentDate = new Date(date);
        return !isNaN(currentDate) && currentDate >= minDate && currentDate <= maxDate;
    };
const getstatistic = async(e) => {
    if (e) e.preventDefault(); 
    if(validator.isDate(startdate) && validator.isDate(enddate) && isValidDate(startdate) && isValidDate(enddate)){
        const token = localStorage.getItem("authorization");
        if (token) {
            console.log(new Date(startdate).toISOString())
            console.log(new Date(enddate).toISOString())
            axios.post("https://localhost:7197/api/Admin/GetAllStatistics",
            {
                startDate: new Date(startdate).toISOString(),
                endDate: new Date(enddate).toISOString()
            }, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            }).then(response => {
                if (response && response.status === 200) {
                    setpoststat(response.data.postStatics);
                    setcommentstat(response.data.commentStatics);
                    setlikestat(response.data.likeStatics);
                    setusercount(response.data.userCount);
                    console.log(response.data)
                }
            }).catch(error => {
                console.error(error.response.data)
            });
        }
        else {
            navigate('/')
        }
    }
    else{
        console.log("Dates not valid!")
    }
}
    useEffect(() => {
        getstatistic();
    }, []);
    const { t } = useTranslation("admintable");

    return (
        <div className='chartcontainer'>
            <div className='chartbody'>
                <form className="chartinputs" onSubmit={(e) => getstatistic(e)}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateField
                            label={t("chartstartdate")}
                            value={startdate}
                            onChange={(e) => setstartdate(e)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DateField
                            label={t("chartenddate")}
                            value={enddate}
                            onChange={(e) => setenddate(e)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <Button type="submit" variant="contained">{t("filterbutton")}</Button>
                    </LocalizationProvider>
                </form>
                <div className='chartflex'>
                    <div>
                        <b>{t("postpermouth")}</b>
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
                        <b>{t("messagepermouth")}</b>
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
                        <b>{t("likepermouth")}</b>
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
                        <p className='counttext'> <PeopleIcon sx={{ fontSize: "3rem" }} /><b>{t("usercount")}: {usercount}</b></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chart;
