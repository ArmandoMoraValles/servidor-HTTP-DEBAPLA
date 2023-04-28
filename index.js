const http = require('http');
const fs = require('fs');

const port = 3000;

// try with this: http://localhost:3000/file.html 
const server = http.createServer((req, res) => {
  const url = req.url;

  // no me gusta el switch case :C 
  let contentType;
  if (url.endsWith('.html')) contentType = 'text/html';
  if (url.endsWith('.json')) contentType = 'application/json';
  if (url.endsWith('.txt')) contentType = 'text/plain';
  //Se pueden agregar mas extensiones de archivos

  if (contentType) {
    fs.readFile(`.${url}`, (err, data) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end('Error interno del servidor');
        return;
      }

      res.setHeader('Content-Type', contentType);
      res.end(data);
    });
  } else {
    res.statusCode = 404;
    res.end('Archivo no encontrado');
  }
});

server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});