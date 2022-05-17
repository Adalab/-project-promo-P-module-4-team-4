// Importar
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const data = [];
const idRandom = uuidv4();

// Configuración del servidor
const server = express();
server.use(cors());
server.use(express.json({ limit: '' }));

server.set('view engine', 'ejs');

// Arrancar el servidor en el puerto 4000
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// Endpoint para llamar

// Endpoint para crear la tarjeta
server.post('/card', (req, res) => {
  const newData = { ...req.body, id: idRandom };
  if (
    req.body.name !== '' &&
    req.body.job !== '' &&
    req.body.mail !== '' &&
    req.body.phone !== '' &&
    req.body.linkedin !== '' &&
    req.body.github !== '' &&
    req.body.palette !== '' &&
    req.body.photo !== ''
  ) {
    const successResponse = {
      success: true,
      cardURL: `http://localhost:4000/card/${idRandom}`,
    };
    res.json(successResponse);
  } else {
    const errorResponse = {
      success: false,
      error: 'Hay un error más grande que una patata.',
    };
    res.json(errorResponse);
  }
});

// server.get('/data', (req, res) => {
//   res.json('holi');
// });

// Generamos un servidos estático
const staticServerPathWeb = './src/public-react'; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathWeb));
// Crear servicio estático para los estilos

const staticServerPathStyle = './src/style'; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathStyle));

server.get('/card/:id', (req, res) => {
  const foundCard = data.find((card) => card.id === req.params.id);

  console.log(foundCard);
  res.json('holi');
  // res.render('card', data.find((data) => ))
});
