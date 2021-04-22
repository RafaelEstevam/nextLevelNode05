import {Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, PrimaryColumn} from 'typeorm';

import {v4 as uuid} from 'uuid';
import {User} from './User';

@Entity("connections")
class Connections{

    @PrimaryColumn()
    id: string;

    @Column()
    admin_id: string;

    @JoinColumn({name: 'user_id'})
    @ManyToOne(()=> User)
    user: User;

    @Column()
    user_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    socket_id: string;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}

export {Connections}