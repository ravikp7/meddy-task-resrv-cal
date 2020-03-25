import React from 'react';
import PropTypes from 'prop-types';
import style from './button.module.css';

const Button = ({ type, onClick, text }) => {
  return (
    <button className={`${style.button} ${style[type]}`} onClick={onClick}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  type: 'primary',
};

Button.propTypes = {
  type: PropTypes.oneOf(['primary', 'danger']),
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default Button;
