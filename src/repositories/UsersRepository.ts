import {Repository, EntityRepository} from 'typeorm';

import {Users} from '../entities/Users';

@EntityRepository(Users)
class UsersReponsitory extends Repository<Users>{}

export {UsersReponsitory}