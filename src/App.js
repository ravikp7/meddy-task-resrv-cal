import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import ConfirmStay from './components/ConfirmStay';
import CancelStay from './components/CancelStay';
import Loader from './components/Loader';
import { getReservations, changeReservations } from './utils/api';
import { getStartOfMonth, getEndOfMonth } from './utils';
import style from './App.module.css';

const date = new Date();
let startTime = getStartOfMonth(date);
let endTime = getEndOfMonth(date);

function App() {
  // This state takes care of currently showing month and year
  const [currentMonth, setMonth] = useState(new Date());
  const [selectedDates, setDates] = useState([]);
  const [reservations, setReservation] = useState([]);
  const [isLoading, setLoadStatus] = useState(false);
  const selectedUnreservedDates = selectedDates.filter(
    date => !reservations.map(({ time }) => new Date(time).toDateString()).includes(date)
  );
  const selectedReservations = reservations.filter(({ time }) =>
    selectedDates.includes(new Date(time).toDateString())
  );

  const fetchReservations = () => {
    return getReservations({ start: startTime, end: endTime })
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
      <Loader isVisible={isLoading} />
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
              setMonth(month => {
                const newMonth = new Date(new Date(month).setMonth(month.getMonth() - 1));
                if (getStartOfMonth(newMonth) < startTime) {
                  startTime = getStartOfMonth(newMonth);
                }
                return newMonth;
              });
            }}
            onNext={() => {
              setMonth(month => {
                const newMonth = new Date(new Date(month).setMonth(month.getMonth() + 1));
                if (getEndOfMonth(newMonth) > endTime) {
                  endTime = getEndOfMonth(newMonth);
                }
                return newMonth;
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
            <ConfirmStay
              dates={selectedUnreservedDates}
              onConfirm={async name => {
                setLoadStatus(true);
                const reservations = selectedUnreservedDates.map(date => {
                  return {
                    tennantName: name,
                    date: new Date(date).getTime(),
                    reserved: true,
                  };
                });
                try {
                  setLoadStatus(true);
                  const res = await changeReservations(reservations);
                  console.log(res);
                  await fetchReservations();
                  setLoadStatus(false);
                } catch (error) {
                  console.log(error);
                  setLoadStatus(false);
                }
                return;
              }}
            />
          </div>
        </div>
        <div className={style.secondRow}>
          <span className={style.reservationHeading}>Reservations on Selected dates</span>
          <div className={style.cancelGrid}>
            {selectedReservations.map(({ tennantName, time }) => (
              <CancelStay
                key={time}
                date={time}
                tennantName={tennantName}
                onCancel={async () => {
                  try {
                    setLoadStatus(true);
                    const res = await changeReservations([
                      { tennantName, date: time, reserved: false },
                    ]);
                    console.log(res);
                    await fetchReservations();
                    setLoadStatus(false);
                  } catch (error) {
                    console.log(error);
                    setLoadStatus(false);
                  }
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
