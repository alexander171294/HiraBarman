import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Commands {
    @PrimaryGeneratedColumn()
    id_command: number;

    @Column({default: null})
    targetchannel?: string;

    @Column({default: null})
    fromuser?: string;

    @Column()
    command: string;

    @Column()
    response: string;
}