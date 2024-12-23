import React from 'react';
import './AboutUs.css';
import FaceIconM from '@mui/icons-material/Face';
import FaceIconF from '@mui/icons-material/Face2';

const AboutUs = () => {
    return (
        <div className='aboutbody'>
            <div>
                <h1>About Us</h1>
            </div>
            <div className='aboutcontent'>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam auctor eros vehicula fermentum ultrices. Mauris mi augue, porttitor non mattis semper, iaculis sit amet elit. Donec non dictum dolor, at sodales elit. Quisque quis scelerisque eros. Cras convallis mattis sem, eget iaculis neque ullamcorper nec. Suspendisse auctor et ante vel luctus. Fusce non leo est. Proin ullamcorper dictum euismod. Sed placerat ex magna, non accumsan urna tincidunt sed.

                In et erat eu dui aliquam blandit. Nam mattis purus ex, ac tempus nunc dignissim eu. Mauris venenatis augue sit amet suscipit efficitur. Proin id aliquam sapien. Vestibulum vel faucibus ipsum. Etiam ultricies ante non elit aliquet, et euismod lacus interdum. Vivamus convallis nunc at risus sodales tempor.

                In ullamcorper pharetra leo sit amet elementum. Nullam nec dui nunc. Curabitur finibus vestibulum orci vitae molestie. Aenean mollis laoreet enim, eget efficitur diam. Duis quis ipsum augue. Ut vitae tempor turpis, et efficitur elit. Maecenas ac ipsum sit amet est lacinia lobortis. Fusce quis enim nec enim porta tincidunt id pretium velit.</p>

                <p>Mauris sit amet sapien varius, malesuada quam pellentesque, molestie sapien. Proin ac ipsum eu neque interdum eleifend. Donec nec blandit quam. Cras venenatis sollicitudin est. Maecenas dictum non quam vitae interdum. Cras accumsan suscipit libero. Cras id interdum mauris, non consectetur sem. Nam blandit justo nulla, ullamcorper pharetra augue sodales at. Donec mollis at ante vitae vehicula.

                Aliquam pulvinar nulla quis ligula sodales, in dapibus dolor faucibus. Integer vehicula orci non enim tempus, vel congue nunc imperdiet. Mauris vehicula urna quis elit tristique malesuada. Aliquam eu tempor purus, sodales dignissim turpis. Duis eu pulvinar nunc. Sed vel dolor a risus condimentum molestie. In ut nulla rhoncus ante dignissim iaculis.</p>
            </div>
            <div className='mt-4'>
                <h2>Our Employees</h2>
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