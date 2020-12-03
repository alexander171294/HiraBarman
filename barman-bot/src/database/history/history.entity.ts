import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('history')
export class HistoryEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id_log: number;

    @Column()
    channel: string;

    @Column()
    author: string;

    @Column()
    message: string;

    @Column()
    date: Date;
}