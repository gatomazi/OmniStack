const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");
const server = express();

//Usuario e senha foram configurados como omnistack no atlas. Após a barra possui o nome omnistack, que será o nome do banco (cria sozinho)
mongoose.connect(
  "mongodb+srv://omnistack:omnistack@cluster0-dro4o.mongodb.net/omnistack?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

server.use(cors());
server.use(express.json());
server.use(routes);
server.listen(3333);
