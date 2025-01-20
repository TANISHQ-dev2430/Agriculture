import React from 'react';
import animation from '../../assets/Animation.mp4'; // Ensure the path to the video file is correct

const Animation = () => {
  return (
    <video loop autoPlay muted style={{ width: '100%', height: 'auto' }}>
      <source src={animation} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default Animation;
