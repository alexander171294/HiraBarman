import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { time } from 'console';
import { InsertResult, Repository } from 'typeorm';
import { Quotes } from './quotes.entity';

@Injectable()
export class QuotesAdapter {

    constructor(
        @InjectRepository(Quotes)
        private quotesRepository: Repository<Quotes>,
    ) {}


    public getRepository(): Repository<Quotes> {
        return this.quotesRepository;
    }

    public add(quote: string, channel: string, author: string): Promise<InsertResult> {
        const q = new Quotes();
        q.author = author;
        q.channel = channel;
        q.quote = quote;
        q.quoteado = new Date();
        return this.quotesRepository.insert(q);
    }

}