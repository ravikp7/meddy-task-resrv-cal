import React, { useState } from 'react';
import strftime from 'strftime';
import PropTypes from 'prop-types';
import Button from '../Button';
import style from './confirmStay.module.css';

const ConfirmStay = ({ dates, onConfirm }) => {
  const [name, setName] = useState('');
  return (
    <div className={style.container}>
      <label>
        <span>Tenant Name:</span>
        <input
          value={name}
          onChange={({ target }) => {
            setName(target.value);
          }}
          className={style.nameInput}
          placeholder="Enter Tenant Name"
        ></input>
      </label>
      <span>
        Stay dates: 
        {` ${dates.map(date => strftime('%b %d', new Date(date))).join(', ')}`}
      </span>
      <Button onClick={onConfirm} text="Confirm Stay"></Button>
    </div>
  );
};

ConfirmStay.propTypes = {
  dates: PropTypes.arrayOf(PropTypes.string).isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmStay;
