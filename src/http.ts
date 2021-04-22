import express from 'express';
import {routes} from './routes';
import {createServer} from 'http';
import {Server, Socket} from 'socket.io';
import path from 'path'

import "reflect-metadata";
import "./database";

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger_output.json');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')))
app.set("views", path.join(__dirname, '..', 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get("/pages/client", (request, response) => {
    return response.render('html/client.html')
})

const http = createServer(app); //Criando protocolo HTTP
const io = new Server(http); //Criando protocolo WS

io.on("connection", (socket: Socket) => {
    console.log("Se conectou", socket.id);
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(routes);

export {http, io}