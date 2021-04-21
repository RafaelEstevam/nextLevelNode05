import {getCustomRepository} from "typeorm";
import {MessagesRepository} from '../repositories/MessagesRepository';

interface MessagesConfig{
    admin_id: string,
    user_id: string,
    text: string,
}

class MessagesService{
    
}

export {MessagesService}