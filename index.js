const http = require('http');
const fs = require('fs');

const port = 3000;

const server = http.createServer((req, res) => {
  // Es asincrono gracias al callback, 
  fs.readFile('file.txt', (err, data) => {
    // Basicamente una funcion que se ejecuta despues de que otra termina, por eso es asincrono
    if (err) {
      console.error(err);
      res.statusCode = 500;
      res.end('Error interno del servidor');
    } else {
      res.setHeader('Content-Type', 'text/plain');
      res.end(data);
    }
  });
});

server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});