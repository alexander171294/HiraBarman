import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Quotes {

    @PrimaryGeneratedColumn()
    id_quote: number;

    @Column({default: null})
    channel?: string;

    @Column({default: null})
    quote: string;

    @Column()
    author: string;

    @Column()
    quoteado: Date;

}