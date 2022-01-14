const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./routes/app.routes');

// HANDLEBARS

const { engine } = require('express-handlebars');
const path = require('path');
let { products } = require('./data/data');

app.engine(
    'handlebars',
    engine({
        extname: 'hbs',
        defaultLayout: 'main.hbs',
        layoutsDir: path.resolve(__dirname, './views/handlebars/layouts'),
        partialsDir: path.resolve(__dirname, './views/handlebars/partials'),
    })
);
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views/handlebars'));

app.get('/', (req, res) => {
    res.render('index', {
        showProducts: false,
        products,
    });
});

app.get('/productos', (req, res) => {
    res.render('index', {
        showProducts: true,
        products,
    });
});

// END HANDLEBARS

app.use(cors());
app.use(morgan('tiny'));
app.use('/api', routes);

app.listen(PORT, function () {
    console.log(`Aplicación escuchando en el puerto ${PORT}.`);
});

app.on('error', error => {
    console.log(error.message);
});
