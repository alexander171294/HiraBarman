import { InjectRepository } from "@nestjs/typeorm";
import { Commands } from "./commands.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CommandsAdapter {
    constructor(
        @InjectRepository(Commands)
        private commandsRepository: Repository<Commands>,
    ) {}

    public async getCommands(filters: FiltersOpt): Promise<Commands[]> {
        let opts: any = {};
        let target = '';
        let params:any = {};
        if (filters.targetChannel) {
            target = '(targetChannel is null' + target + ' OR lower(targetChannel) = :tgch)';
            params.tgch = filters.targetChannel;
        }
        if(filters.fromUser) {
            if (target != '') {
                target += ' AND ';
            }
            target += '(fromUser is null OR lower(fromUser) = :fusr)';
            params.fusr = filters.fromUser;
        }
        const query = this.commandsRepository.createQueryBuilder("commands");
        if(target != '') {
            query.where(target);
        }
        let out: Commands[] = [];
        try {
            out = await query.setParameters(params).getMany();
        } catch(e) {
            console.log('ERRROR:', e);
        }
        return out;
    }

    async getChannelsOfCommands() {
        const dbresp = await this.commandsRepository.createQueryBuilder("commands").distinctOn(['targetchannel']).getMany();
        const out = [];
        dbresp.forEach(command => {
            out.push(command.targetchannel);
        })
        return out;
    }

    public getRepository(): Repository<Commands> {
        return this.commandsRepository;
    }
}

export class FiltersOpt {
    targetChannel?: string;
    fromUser?: string;
}