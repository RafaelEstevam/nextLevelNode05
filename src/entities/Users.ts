import {Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn} from 'typeorm';

import {v4 as uuid} from "uuid";

@Entity("users")

class Users{

    @PrimaryColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }

}

export {Users}