import React from 'react';
import './ContactUs.css';

import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import Link from '@mui/material/Link';

function ContactUs(props) {
    return (
        <div className='contactcontainer'>
            <div className='contactbody'>
                <b className='h1'>Contact Us</b>
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id lorem ex. Nam facilisis mollis tortor id euismod. Aenean sollicitudin nibh ut nunc egestas, in lobortis leo venenatis. Quisque egestas id lacus sed semper. Sed id elit molestie, ultrices tortor id, pulvinar nulla. Morbi molestie laoreet sapien. Curabitur diam ante, pretium a molestie vitae, hendrerit a purus. Praesent a pharetra enim, ornare lobortis sem. Sed at justo odio. Donec non nisl ullamcorper mi dictum pharetra vel eget ligula. Nunc quis dui diam. Pellentesque mattis faucibus arcu euismod iaculis. Quisque suscipit ut nisl quis tristique. Mauris hendrerit, justo eget bibendum maximus, neque lacus consequat felis, non scelerisque est est sit amet nisl. Fusce a turpis molestie, fermentum nibh id, rutrum massa.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;