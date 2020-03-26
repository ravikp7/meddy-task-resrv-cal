import React from 'react';
import strftime from 'strftime';
import PropTypes from 'prop-types';
import Button from '../Button';
import style from './cancelStay.module.css';

const CancelStay = ({ date, onCancel, tennantName }) => {
  return (
    <div className={style.container}>
        <span>Tenant Name: {tennantName}</span>
      <span>
        Stay date:
        {` ${strftime('%b %d', new Date(date))}`}
      </span>
      <Button onClick={onCancel} text="Cancel Stay" type="danger"></Button>
    </div>
  );
};

CancelStay.propTypes = {
  date: PropTypes.number.isRequired,
  onCancel: PropTypes.func.isRequired,
  tennantName: PropTypes.string.isRequired,
};

export default CancelStay;
