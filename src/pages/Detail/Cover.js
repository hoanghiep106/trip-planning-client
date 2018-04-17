import React from 'react';

const Cover = ({ imageUrl }) => (
  <div className="cover">
    <div className="cover-block">
      <img className="cover-block__image" src={imageUrl} alt="place" />
    </div>
    <div className="cover-block">
      <img className="cover-block__image" src={imageUrl} alt="place" />
    </div>
    <div className="cover-block">
      <img className="cover-block__image" src={imageUrl} alt="place" />
    </div>
  </div>
);

export default Cover;