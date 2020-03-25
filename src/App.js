import React, { useState } from 'react';
import Calendar from './components/Calendar';
import './App.css';

function App() {
  const [selectedDates, setDates] = useState([]);
  return (
    <div className="App">
      <header className="App-header">
        Calendar Reserver
      </header>
      <Calendar
        selectedDates={selectedDates}
        onDateChange={(date) => {
          setDates(dates => {
            if (dates.includes(date)) {
              const dateIndex = dates.indexOf(date);
              return [...dates.slice(0, dateIndex), ...dates.slice(dateIndex + 1, dates.length)];
            }
            return [...dates, date];
          });
        }}
      /> 
    </div>
  );
}

export default App;
