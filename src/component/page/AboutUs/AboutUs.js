import React from 'react';
import './AboutUs.css';
import FaceIconM from '@mui/icons-material/Face';
import FaceIconF from '@mui/icons-material/Face2';
import { useTranslation } from "react-i18next";
const AboutUs = () => {
    const { t } = useTranslation("abouttable");
    return (
        <div className='aboutbody'>
            <div>
                <h1>{t("about")}</h1>
            </div>
            <div className='aboutcontent'>
                <p>{t("abouttext1")}</p>

                <p>{t("abouttext2")}</p>
            </div>
            <div className='mt-4'>
                <h2>{t("employess")}</h2>
            </div>
            <div className='employees mt-5'>
                <div>
                    <FaceIconM style={{ fontSize: '100px' }}/>
                    <b>Ahmet</b>
                </div>
                <div>
                    <FaceIconM style={{ fontSize: '100px' }}/>
                    <b>Mehmet</b>
                </div>
                <div>
                    <FaceIconF style={{ fontSize: '100px' }}/>
                    <b>Ayşe</b>
                </div>
                <div>
                    <FaceIconM style={{ fontSize: '100px' }}/>
                    <b>Yusuf</b>
                </div>
                <div>
                    <FaceIconF style={{ fontSize: '100px' }}/>
                    <b>Nur </b>
                </div>
                <div>
                    <FaceIconM style={{ fontSize: '100px' }}/>
                    <b>Buğra</b>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;