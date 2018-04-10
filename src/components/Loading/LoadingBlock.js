import React from 'react';
import ReactLoading from 'react-loading';

const LoadingBlock = ({ className }) => (
  <div className={`loading-block ${className}`}>
    <ReactLoading
      type="spin"
      color="#fff"
      width="20px"
      height="20px"
      className="loading-block-spinner"
    />
  </div>
);

export default LoadingBlock;
