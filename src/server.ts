import express from 'express';
import "./database";
import {routes} from './routes';
import "reflect-metadata";

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger_output.json');

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.log("Server On port 3333");
})