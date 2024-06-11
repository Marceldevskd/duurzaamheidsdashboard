import React from "react";

const AnimatedGif = ({ src, alt, style }) => {
  return <img src={src} alt={alt} style={{width: '100%', height: '100%', objectFit: 'fill'}}/>;
  
};

export default AnimatedGif;
