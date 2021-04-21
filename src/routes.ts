import { Router } from "express";

import { MessagesController } from "./controllers/MessagesController";
import {SettingsController} from './controllers/SettingsController';
import {UsersController} from './controllers/UsersController';

const routes = Router();

const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();

routes.post("/settings", settingsController.create, () => {
    /* #swagger.tags = ['Settings']
        #swagger.description = 'Endpoint to add a settings.' */

    /*  #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Settings.',
            required: true,
            schema: { $ref: "#/definitions/AddSettings" }
    } */
});

routes.post("/users", usersController.create, () => {
    /* #swagger.tags = ['Users']
        #swagger.description = 'Endpoint to add a user.' */

    /*  #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Users.',
            required: true,
            schema: { $ref: "#/definitions/AddUser" }
    } */
});

routes.post("/messages", messagesController.create, () => {
    /*  #swagger.auto = false
        #swagger.tags = ['Messages']
        #swagger.path = '/messages'
        #swagger.method = 'post'
        #swagger.description = 'Endpoint to add a message.' */

    /*  #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Body Message',
            required: true,
            schema: { $ref: "#/definitions/AddMessage" }
    } */
});

routes.get("/messages/:id", messagesController.index, () => {
    /*  #swagger.auto = false
        #swagger.tags = ['Messages']
        #swagger.path = '/messages/{id}'
        #swagger.method = 'get'
        #swagger.description = 'Endpoint to get all user's message.'
        #swagger.messages = ["application/json"]
    */

    /*  #swagger.parameters['id'] = {
            in: 'path',
            description: 'User ID',
            required: true,
            type: 'string'
        }
    */
});



export {routes};