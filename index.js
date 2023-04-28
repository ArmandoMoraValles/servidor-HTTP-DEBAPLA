const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer((req, res) => {
  try {
    const fileData = fs.readFileSync('file.txt');
    res.setHeader('Content-Type', 'text/plain');
    res.end(fileData);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end('Error interno del servidor');
  }
});

server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});