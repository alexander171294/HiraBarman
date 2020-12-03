import { HistoryEntity } from './history.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class HistoryAdapter {

    constructor(
        @InjectRepository(HistoryEntity)
        private historyRepository: Repository<HistoryEntity>,
    ) {}

    public add(from: string, to: string, text: string) {
        const hs = new HistoryEntity();
        hs.author = from;
        hs.channel = to;
        hs.message = text;
        hs.date = new Date();
        return this.historyRepository.insert(hs);
    }

    async getChannels() {
        const dbresp = await this.historyRepository.createQueryBuilder("history").distinctOn(['channel']).getMany();
        const out = [];
        dbresp.forEach(command => {
            out.push(command.channel);
        })
        return out;
    }

    public getRepository(): Repository<HistoryEntity> {
        return this.historyRepository;
    }

}