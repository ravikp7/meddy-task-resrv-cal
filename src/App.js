import React, { useState } from 'react';
import Calendar from './components/Calendar';
import ConfirmStay from './components/ConfirmStay';
import CancelStay from './components/CancelStay';
import style from './App.module.css';

function App() {
  const [selectedDates, setDates] = useState([]);
  return (
    <div className={style.App}>
      <header className={style.AppHeader}>Calendar Reserver</header>
      <div className={style.mainBody}>
        <div className={style.firstRow}>
          <Calendar
            selectedDates={selectedDates}
            onDateChange={date => {
              setDates(dates => {
                if (dates.includes(date)) {
                  const dateIndex = dates.indexOf(date);
                  return [
                    ...dates.slice(0, dateIndex),
                    ...dates.slice(dateIndex + 1, dates.length),
                  ];
                }
                return [...dates, date];
              });
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <span className={style.reservationHeading}>Add reservation</span>
            <ConfirmStay dates={selectedDates} />
          </div>
        </div>
        <div className={style.secondRow}>
          <span className={style.reservationHeading}>Reservations on Selected dates</span>
          <div className={style.cancelGrid}>
            {selectedDates.map(date => (
              <CancelStay date={date} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
