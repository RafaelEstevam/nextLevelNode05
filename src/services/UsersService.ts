import {getCustomRepository} from "typeorm";
import {UsersReponsitory} from "../repositories/UsersRepository";

interface UserConfig {
    username: string,
    email: string,
    password: string
}

class UsersService{
    async create({username, email, password}: UserConfig){
        const usersRepository = getCustomRepository(UsersReponsitory);

        const user = await usersRepository.findOne({
            email
        })

        if(user){
            return user;
            // throw new Error("Email already exists!")
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