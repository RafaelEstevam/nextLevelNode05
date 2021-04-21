import express from 'express';
import "./database";
import {routes} from './routes';
import "reflect-metadata";

const app = express();

app.use(express.json());
app.use(routes);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3333, () => {
    console.log("Server On port 3333");
})