import React from 'react';
import me from '../pages/me.JPG';
import SocialFollow from './SocialFollow';

const About = () => {
  return (
    <div className=''>
      <h1 className='text-center'>About me</h1>
      <p className='my-1'></p>
      <p className='card p' style={{ padding: 40 }}>
        <strong>Jackie Camlez </strong>
        <img className='py-2' src={me} alt='' />
        <p>
          I am a freelance actress. I like blogging and sharing my life
          experiences with the world, and this is the reason why I created this
          blog. In my free time, I like to paint and color t-shirts. I studied
          and worked previously in fashion design.
        </p>
        <div style={{ paddingBottom: 20 }}></div>
        <SocialFollow />
      </p>
    </div>
  );
};

export default About;
