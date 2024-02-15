import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique, OneToMany } from "typeorm";
import {Task} from "../tasks/task.entity";

@Entity()
@Unique(['username'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    salt: string;

    @Column()
    password: string;

    @OneToMany(type => Task, task => task.user, { eager: true })
    tasks: Task[];
}