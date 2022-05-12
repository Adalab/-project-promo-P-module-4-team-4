const getDataApi = (data) => {
  // const URL = "https://awesome-profile-cards.herokuapp.com/card";

  return fetch("https://localhost:4000/card", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  }).then((response) => response.json());
  // .then((result) => {

  // })
  // .catch((error) => console.log(`Ha sucedido un error: ${error}`));
};

export default getDataApi;
