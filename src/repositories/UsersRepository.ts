import {Repository, EntityRepository} from 'typeorm';

import {User} from '../entities/User';

@EntityRepository(User)
class UsersReponsitory extends Repository<User>{}

export {UsersReponsitory}