import {getCustomRepository} from "typeorm";
import {UsersRepository} from "../repositories/UsersRepository";

interface UserConfig {
    username: string,
    email: string,
    password: string
}

class UsersService{
    async create({username, email, password}: UserConfig){
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne({
            email
        })

        if(user){
            return user;
        }

        const newUser = usersRepository.create({
            username,
            email,
            password
        });

        await usersRepository.save(newUser);

        return newUser;
    }
}

export {UsersService}