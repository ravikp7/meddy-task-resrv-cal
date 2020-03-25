import React from 'react';
import strftime from 'strftime';
import PropTypes from 'prop-types';
import Button from '../Button';
import style from './cancelStay.module.css';

const CancelStay = ({ date, onCancel, tenantName }) => {
  return (
    <div className={style.container}>
        <span>Tenant Name: {tenantName}</span>
      <span>
        Stay date:
        {` ${strftime('%b %d', new Date(date))}`}
      </span>
      <Button onClick={onCancel} text="Cancel Stay" type="danger"></Button>
    </div>
  );
};

CancelStay.propTypes = {
  dates: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default CancelStay;
