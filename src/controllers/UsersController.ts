import {Request, Response} from 'express';
import {UsersService} from '../services/UsersService';

class UsersController{
    async create(request: Request, response: Response): Promise<Response>{
        const {username, email, password} = request.body;
        const usersService = new UsersService();

        try{
            const user = await usersService.create({username, email, password});
            return response.json(user);
        }catch(error){
            return response.status(400).json({message: error.message})
        }
    }
}

export {UsersController}