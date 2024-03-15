import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm'
import { TaskEntity } from './task.entity'


@Entity('users')
export class UserEntity {
    constructor() {
        this.username = '',
        this.password = ''
    }

    @PrimaryGeneratedColumn({ type: 'integer' })
    id!: number

    @Column({ type: 'varchar', unique: true, nullable: false, length: 255 })
    username: string

    @Column({ type: 'varchar', nullable: false, length: 255 })
    password?: string

    @CreateDateColumn({ nullable: true })
    createdAt!: Date

    @CreateDateColumn({ nullable: true })
    updatedAt!: Date

    @OneToMany(() => TaskEntity, (task) => task.user)
    tasks!: TaskEntity[]
}