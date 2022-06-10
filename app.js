const express = require('express');
const app = express();
const morgan = require('morgan')
const cors = require('cors')
const expressFileUpload = require("express-fileupload");
const history = require('connect-history-api-fallback');
// Settings
app.set('port', 3000)
app.listen(app.get('port'), console.log('Server on port 3000'));


// Middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(
    expressFileUpload({
      limits: 5000000,
      abortOnLimit: true,
      responseOnLimit: "El tamaño de la imagen supera el límite permitido",
    })
  );
app.use(history());
app.use(express.static(__dirname + '/public'))

// Rutas
app.use('/', require('./routes/auth.routes'))

