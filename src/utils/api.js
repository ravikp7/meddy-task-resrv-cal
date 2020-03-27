const BASE_URL = 'http://localhost:3001';

const getReservations = async ({ start, end }) => {
  try {
    const response = await fetch(`${BASE_URL}/reserve/${start}/${end}`);
    if (response.ok) {
      return response.json();
    }
    const resText = await response.text();
    throw resText;
  } catch (error) {
    throw new Error(error);
  }
};

const changeReservations = async (reservations) => {
  try {
    const response = await fetch(`${BASE_URL}/reserve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reservations
      }),
    });
    if (response.ok) {
      return response.json();
    }
    const resText = await response.text();
    throw resText;
  } catch (error) {
    throw new Error(error);
  }
};

export { getReservations, changeReservations };
