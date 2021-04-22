import {getCustomRepository, Repository} from "typeorm";
import {UsersRepository} from "../repositories/UsersRepository";
import {User} from '../entities/User';

interface UserConfig {
    username: string,
    email: string,
    password: string
}

class UsersService{

    private usersRepository: Repository<User>;

    constructor(){
        this.usersRepository = getCustomRepository(UsersRepository);
    }

    async create({username, email, password}: UserConfig){

        const user = await this.usersRepository.findOne({
            email
        })

        if(user){
            return user;
        }

        const newUser = this.usersRepository.create({
            username,
            email,
            password
        });

        await this.usersRepository.save(newUser);

        return newUser;
    }

    async findByEmail (email:string){

        const user = await this.usersRepository.findOne({
            email
        })

        if(user){
            return user;
        }
    }
}

export {UsersService}