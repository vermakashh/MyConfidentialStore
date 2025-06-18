import React from 'react';
import './styles/ImagePair.css';

const ImagePair = () => {
  return (
    <div className="image-pair-container">
      <div className="image-box">
        <img src="/images/imagepair1.JPG" alt="First" />
      </div>
      <div className="image-box">
        <img src="/images/imagepair2.JPG" alt="Second" />
      </div>
    </div>
  );
};

export default ImagePair;
