// Importar
const express = require("express");
const cors = require("cors");

// Configuración del servidor
const server = express();
server.use(cors());
server.use(express.json());

// Arrancar el servidor en el puerto 4000
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// Endpoint para llamar

// Endpoint para crear la tarjeta
server.post("/card", (req, res) => {
  const successResponse = {
    success: true,
    cardURL:
      "https://awesome-profile-cards.herokuapp.com/card/56671652352644899",
  };
  const errorResponse = {
    success: false,
    error: "Hay un error más grande que una patata.",
  };
  res.json();
});

server.get("/card", (req, res) => {
  res.send("Holi");
});
