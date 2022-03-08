const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const http = require("http");
const DB = require("./database/index.js");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
const path = require("path");
const { PORT, DATABASE, MONGO_URI } = require('./config/index');
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: MongoStore.create({mongoUrl: MONGO_URI}),
    secret: "login",
    saveUninitialized: false,
    resave: false,
    rolling: true,
    cookie: {
      maxAge: 60000,
    },
  })
);

const apiRoutes = require("./routes/api/api.routes");
const webRoutes = require("./routes/web/web.routes");
const chatDao = require("./daos/index");
const getNormalizedData = require("./utils/normalizr");

const emitMessage = async () => {
  const mensaje = await chatDao.getAllDataOrById();
  const normalizedData = getNormalizedData(mensaje);
  io.sockets.emit("chat", normalizedData);
};

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/index.html"));
});

io.on("connection", async (socket) => {
  emitMessage();
  socket.on("message", async (message) => {
    if (message.email) {
      await chatDao.save(message);
      emitMessage();
    }
  });
});

app.use(cors());
app.use(morgan('tiny'));
app.use('/api', apiRoutes);
app.use('/', webRoutes);

server.listen(PORT, () => {
  const db = new DB();
  db.connect(DATABASE);
  console.log(`Server escuchando en el puerto ${PORT}.`);
});

server.on('error', error => {
  console.log(error.message);
});