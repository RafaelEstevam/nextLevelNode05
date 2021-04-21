import {Request, Response} from 'express';
import {MessagesService} from '../services/MessagesService';

class MessagesController{

    async create(request: Request, response: Response){
        const {admin_id, user_id, text} = request.body;
        const messagesService = new MessagesService();

        try{
            const message = await messagesService.create({admin_id, text, user_id})
            return response.json(message);
        }catch(error){
            return response.status(400).json({message: error.message})
        }
    }

    async index(request: Request, response: Response){

        const {id} = request.params;
        const messagesService = new MessagesService();
        try{
            const allMessages = await messagesService.index(id);
            return response.json(allMessages);
        }catch(error){
            return response.status(400).json({message: error.message})
        }

    }

}

export {MessagesController}