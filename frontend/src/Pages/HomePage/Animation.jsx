import React from 'react';
import animation from '../../assets/Animation.mp4';

const Animation = () => {
  return (
    <video autoPlay loop muted>
      <source src={animation} type="video/mp4" />
    </video>
  );
};
export default Animation;
