import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity('account')
export class Account {
    constructor() {
        this.username = '',
        this.password = ''
    }

    @PrimaryGeneratedColumn({ type: 'integer' })
    id?: number

    @Column({ type: 'varchar',  unique: true, nullable: false, length: 255 })
    username: string
    
    @Column({ type:'varchar', nullable: false, length: 255 })
    password: string

    @CreateDateColumn({ nullable: true })
    createdAt!: Date

    @CreateDateColumn({ nullable: true })
    updatedAt!: Date
}