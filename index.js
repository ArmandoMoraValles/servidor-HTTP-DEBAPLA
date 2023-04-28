const http = require('http');
const fs = require('fs');

const port = 3000;

// try with this: http://localhost:3000/file.html 
const server = http.createServer((req, res) => {
  const url = req.url;

  let contentType;
  if (url.endsWith('.html')) {
    contentType = 'text/html';
  } else if (url.endsWith('.json')) {
    contentType = 'application/json';
  } else if (url.endsWith('.txt')) {
    contentType = 'text/plain';
  }

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