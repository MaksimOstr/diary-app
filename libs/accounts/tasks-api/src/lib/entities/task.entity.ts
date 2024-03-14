import { UserEntity } from "@diary-app/user";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('tasks')
export class TaskEntity {
    constructor() {
        this.taskTitle = ''
        this.taskDescription = ''
    }

    @PrimaryGeneratedColumn()
    id?: number

    @Column({ type: 'varchar', unique: true, nullable: false, length: 255 })
    taskTitle: string

    @Column({ type: 'varchar', unique: true, nullable: false, length: 255 })
    taskDescription: string

    @ManyToOne(() => UserEntity, (user) => user.tasks)
    user!: UserEntity

}