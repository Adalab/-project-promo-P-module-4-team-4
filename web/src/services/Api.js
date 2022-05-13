const getDataApi = (data) => {
  // const URL = "https://awesome-profile-cards.herokuapp.com/card";

  return fetch("http://localhost:4000/card", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => data);
  // .catch((error) => console.log(`Ha sucedido un error: ${error}`));
};

export default getDataApi;
