import React from 'react';
import me from '../pages/me.JPG';

const About = () => {
  return (
    <div className='my-3 py-3'>
      <h1 className='text-center'>About me</h1>
      <p className='my-1'></p>
      <p className='card p' style={{ padding: 40 }}>
        <strong>Jackeline Campos </strong>
        <img className='py-2' src={me} alt='' />
        <p>
          I am a freelance actress. I like blogging and sharing my life
          experiences with the world, and this is the reason why I created this
          blog. In my free time, I like to paint and color t-shirts. I studied
          and worked previously in fashion design.
        </p>
        <div style={{}}></div>
      </p>
    </div>
  );
};

export default About;
