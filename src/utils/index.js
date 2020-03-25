/**
 * 
 * @param {Date object} date 
 * @returns {number} days
 */
const getDays = (date) => {
  const d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.getDate();
}

/**
 * 
 * @param {string} date1 
 * @param {string} date2 
 */
const areDatesEqual = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return d1.getFullYear() === d2.getFullYear()
    && d1.getMonth() === d2.getMonth()
    && d1.getDate() === d2.getDate();
}

export { getDays, areDatesEqual };