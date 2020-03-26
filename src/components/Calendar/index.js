import React, { useState } from 'react';
import strftime from 'strftime';
import PropTypes from 'prop-types';
import { getDays } from '../../utils';
import style from './calendar.module.css';

const Calendar = ({ onDateChange, selectedDates, currentMonth, onNext, onPrevious }) => {
  
  const daysInCurrentMonth = getDays(currentMonth);
  const offset = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const days = [...Array(daysInCurrentMonth + offset).keys()];
  const rows = [...Array(Math.ceil(daysInCurrentMonth / 7)).keys()];

  return (
    <div className={style.container}>
      <div className={style.header}>
        <button
          className={style.navButton}
          onClick={onPrevious}
        >
          {'<'}
        </button>
        <span>{strftime('%b %Y', currentMonth)}</span>
        <button
          className={style.navButton}
          onClick={onNext}
        >
          {'>'}
        </button>
      </div>
      <div className={style.calBody}>
        <table className={style.calTable}>
          <thead>
            <tr>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(rowIndex => {
              return (
                <tr key={rowIndex}>
                  {days.slice(rowIndex * 7, (rowIndex + 1) * 7).map(index => {
                    const day = index - offset + 1;
                    const date = new Date(new Date(currentMonth).setDate(day));
                    if (index >= offset) {
                      return (
                        <td key={day}>
                          <button
                            className={selectedDates.includes(date.toDateString()) ? `${style.dayButton} ${style.selectedButton}` : `${style.dayButton}`}
                            onClick={() => {
                              onDateChange(date.toDateString());
                            }}
                          >
                            {day}
                          </button>
                        </td>
                      );
                    }
                    return <td key={`offset${index}`}></td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Calendar.propTypes = {
  onDateChange: PropTypes.func.isRequired,
  selectedDates: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Calendar;
