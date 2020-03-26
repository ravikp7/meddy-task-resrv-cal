import React from 'react';
import PropTypes from 'prop-types';
import Overlay from '../Overlay';
import Button from '../Button';
import style from './modal.module.css';

const Modal = ({ isVisible, text, onOk }) => {
  if (!isVisible) {
    return <></>;
  }
  return (
    <Overlay>
      <div className={style.container}>
        <span>{text}</span>
        <Button text="OK" onClick={() => {
          onOk();
        }} />
      </div>
    </Overlay>
  );
};

Modal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default Modal;
