// Importar
const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const Database = require("better-sqlite3");
//const data = [];

// Configuración del servidor
const server = express();
server.use(cors());
server.use(express.json({ limit: "10mb" }));

server.set("view engine", "ejs");

// Arrancar el servidor en el puerto 4000
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// Endpoint para llamar

// Endpoint para crear la tarjeta
server.post("/card", (req, res) => {
  const newData = { id: uuidv4() };
  if (
    req.body.name !== "" &&
    req.body.job !== "" &&
    req.body.email !== "" &&
    req.body.phone !== "" &&
    req.body.linkedin !== "" &&
    req.body.github !== "" &&
    req.body.palette !== "" &&
    req.body.photo !== ""
  ) {
    const query = db.prepare(
      "INSERT INTO cards(name,  job, email, phone, linkedin, github, palette, photo, uuid) VALUES (?,?,?,?,?,?,?,?,?)"
    );
    const bodyParams = req.body;
    const insertCard = query.run(
      bodyParams.name,
      bodyParams.job,
      bodyParams.email,
      bodyParams.phone,
      bodyParams.linkedin,
      bodyParams.github,
      bodyParams.palette,
      bodyParams.photo,
      newData.id
    );
    const successResponse = {
      success: true,
      cardURL: `http://localhost:4000/card/${newData.id}`,
    };
    res.json(successResponse);
  } else {
    const errorResponse = {
      success: false,
      error: "Hay un error más grande que una patata.",
    };
    res.json(errorResponse);
  }
});

server.get("/card/:id", (req, res) => {
  //const foundCard = data.find((card) => card.id === req.params.id);
  const query = db.prepare("SELECT * FROM cards WHERE uuid = ?");
  const foundCard = query.get (req.params.id);
  console.log(foundCard);
  res.render("card", foundCard);
});

//Definino  la DB con la que vamos a trabajar. para pintar las sentencias sql en la consola
const db = Database("./src/data/database.db", { verbose: console.log });

// Generamos un servidos estático
const staticServerPathWeb = "./src/public-react"; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathWeb));
// Crear servicio estático para los estilos

const staticServerPathStyle = "./src/styles"; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathStyle));
