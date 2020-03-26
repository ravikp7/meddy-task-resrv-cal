import React from 'react';
import PropTypes from 'prop-types';
import Overlay from '../Overlay';
import './loader.css';

const Loader = ({ isVisible }) => {
  if (!isVisible) {
    return <></>;
  }
  return (
    <Overlay>
      <div className="loading-card">
        <div className="loading-bubble" />
        <div className="loading-bubble" />
        <div className="loading-bubble" />
        <div className="loading-bubble" />
      </div>
    </Overlay>
  );
};

Loader.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};

export default Loader;
