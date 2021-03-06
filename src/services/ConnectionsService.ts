import {getCustomRepository, Repository} from 'typeorm';
import {Connections} from '../entities/Connections';
import {ConnectionsRepository} from '../repositories/ConnectionsRepository';

interface ConnectionsConfig{
    admin_id?: string,
    id?: string,
    user_id: string,
    socket_id: string
}

class ConnectionsService{

    private connectionsRepository: Repository<Connections>;

    constructor(){
        this.connectionsRepository = getCustomRepository(ConnectionsRepository);
    }

    async create({id, admin_id, user_id, socket_id}:ConnectionsConfig){
        const connection = this.connectionsRepository.create({
            id,
            admin_id,
            user_id,
            socket_id
        })
        await this.connectionsRepository.save(connection);
        return connection;
    }

    async findByUserId(user_id: string){
        const connection = this.connectionsRepository.findOne({
            user_id
        })
        return connection;
    }

    async getAllConnectionsWithoutAdmin(){
        const allConnections = this.connectionsRepository.find({
            where: { admin_id: null},
            relations: ['user'],
        })
        return allConnections;
    }

    async findBySocketId(socket_id: string){
        const connection = this.connectionsRepository.findOne({
            socket_id
        });

        return connection;
    }

    async updateAdminId(user_id: string, admin_id: string){
        await this.connectionsRepository.createQueryBuilder()
            .update(Connections)
            .set({admin_id})
            .where("user_id = :user_id", {user_id})
        .execute();
    }

}

export {ConnectionsService}