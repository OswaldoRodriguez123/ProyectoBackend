const express = require('express');
const cors = require('cors');
const morgan = require('morgan')

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./routes');

app.use(cors());
app.use(morgan('tiny'));
app.use('/api', routes);

app.listen(PORT, function () {
    console.log(`Aplicación escuchando en el puerto ${PORT}.`);
});

app.on('error', error => {
    console.log(error.message);
});
