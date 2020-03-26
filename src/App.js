import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import ConfirmStay from './components/ConfirmStay';
import CancelStay from './components/CancelStay';
import { getReservations, changeReservations } from './utils/api';
import { getStartOfMonth, getEndOfMonth } from './utils';
import style from './App.module.css';

const date = new Date();
const startTime = getStartOfMonth(date);
const endTime = getEndOfMonth(date);

function App() {
  // This state takes care of currently showing month and year
  const [currentMonth, setMonth] = useState(new Date());
  const [selectedDates, setDates] = useState([]);
  const [reservations, setReservation] = useState([]);
  const selectedUnreservedDates = selectedDates.filter(
    date => !reservations.map(({ time }) => new Date(time).toDateString()).includes(date)
  );
  const selectedReservations = reservations.filter(({ time }) =>
    selectedDates.includes(new Date(time).toDateString())
  );

  const fetchReservations = () => {
    getReservations({ start: startTime, end: endTime })
      .then(({ reserved }) => {
        setReservation(reserved);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchReservations();
  }, [currentMonth]);

  return (
    <div className={style.App}>
      <header className={style.AppHeader}>Calendar Reserver</header>
      <div className={style.mainBody}>
        <div className={style.firstRow}>
          <Calendar
            selectedDates={selectedDates}
            currentMonth={currentMonth}
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
            onPrevious={() => {
              setMonth(month => new Date(new Date(month).setMonth(month.getMonth() - 1)));
            }}
            onNext={() => {
              setMonth(month => new Date(new Date(month).setMonth(month.getMonth() + 1)));
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
            <ConfirmStay
              dates={selectedUnreservedDates}
              onConfirm={name => {
                const reservations = selectedUnreservedDates.map(date => {
                  return {
                    tennantName: name,
                    date: new Date(date).getTime(),
                    reserved: true,
                  };
                });
                return changeReservations(reservations)
                  .then(res => {
                    console.log(res);
                    fetchReservations();
                  })
                  .catch(error => {
                    console.log(error);
                  });
              }}
            />
          </div>
        </div>
        <div className={style.secondRow}>
          <span className={style.reservationHeading}>Reservations on Selected dates</span>
          <div className={style.cancelGrid}>
            {selectedReservations.map(({ tennantName, time }) => (
              <CancelStay
                date={time}
                tennantName={tennantName}
                onCancel={() => {
                  changeReservations([{ tennantName, date: time, reserved: false }])
                    .then(res => {
                      console.log(res);
                      fetchReservations();
                    })
                    .catch(error => {
                      console.log(error);
                    });
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
