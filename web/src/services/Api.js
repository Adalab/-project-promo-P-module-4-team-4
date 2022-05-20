const getDataApi = (data) => {
  try {
    // const URL = "https://awesome-profile-cards.herokuapp.com/card";

    return fetch('https://app-refactorizadas.herokuapp.com/card', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => data);
  } catch (error) {
    console.error(`Ha sucedido un error: ${error}`);
  }
};

export default getDataApi;
