import React from 'react';
import './DataStream.css';

export const DataStream: React.FC = () => {
  return (
    <>
      <div className="data-stream" style={{ left: '10%', animationDelay: '0s' }}></div>
      <div className="data-stream" style={{ left: '25%', animationDelay: '0.5s', height: '150px' }}></div>
      <div className="data-stream" style={{ left: '50%', animationDelay: '1s' }}></div>
      <div className="data-stream" style={{ left: '75%', animationDelay: '1.5s', height: '120px' }}></div>
      <div className="data-stream" style={{ left: '90%', animationDelay: '2s' }}></div>
    </>
  );
};