const BASE_URL = 'http://localhost:3000';

const getReservations = async ({ start, end }) => {
  try {
    const response = await fetch(`${BASE_URL}/reserve/${start}/${end}`);
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Request failed with status code ${response.status}`);
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
    throw new Error(`Request failed with status code ${response.status}`);
  } catch (error) {
    throw new Error(error);
  }
};

export { getReservations, changeReservations };
