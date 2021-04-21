import {getCustomRepository, Repository} from "typeorm";
import { Messages } from "../entities/Messages";
import {MessagesRepository} from '../repositories/MessagesRepository';

interface MessagesConfig{
    admin_id?: string,
    user_id: string,
    text: string,
}


class MessagesService{

    private messageRepository: Repository<Messages>;
    constructor(){
        this.messageRepository = getCustomRepository(MessagesRepository);
    }

    async create({admin_id, user_id, text}:MessagesConfig){
        
        const message = this.messageRepository.create({
            text,
            admin_id,
            user_id
        });

        await this.messageRepository.save(message);

        return message;
    }

    async index(user_id: string){

        const messagesOfUser = await this.messageRepository.find({
            where: {user_id},
            relations: ["user"]
        });

        if(messagesOfUser.length === 0){
            throw new Error("User's message not found");
        }

        return messagesOfUser;

    }
}

export {MessagesService}