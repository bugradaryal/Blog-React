import React from 'react';
import './ContactUs.css';

import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import Link from '@mui/material/Link';

import { useTranslation } from "react-i18next";
function ContactUs(props) {
    const { t } = useTranslation("contacttable");
    return (
        <div className='contactcontainer'>
            <div className='contactbody'>
                <b className='h1'>{t("contact")}</b>
                <div className='contactcontent'>
                    <div className='contactcloums'>
                        <div>
                            <Link href="https://x.com/" target="_blank" sx={{color:'black'}} underline="hover"><TwitterIcon/> Twitter</Link>
                        </div>
                        <div>
                            <Link href="https://www.instagram.com/" target="_blank" sx={{color:'black'}} underline="hover"><InstagramIcon/> Instegram</Link>
                        </div>
                        <div>
                            <p><WhatsAppIcon/> (+90)555 555 55 55</p>
                        </div>
                        <div>
                            <p><PhoneAndroidIcon/> (+90)555 555 55 55</p>
                        </div>
                        <div>
                            <p><LocationOnIcon/> Türkiye, Tekirdağ, Çorlu</p>
                        </div>
                    </div>
                    <div className='contacttext'>
                        <b className='h2'>MyBlog</b>
                        <p>
                        {t("contacttext")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;