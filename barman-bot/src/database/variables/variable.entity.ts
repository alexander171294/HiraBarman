import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Variable {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: null})
    channel?: string;

    @Column({default: null})
    username?: string;

    @Column({default: null})
    varname?: string;

    @Column({default: null})
    rawvalue?: string;
}