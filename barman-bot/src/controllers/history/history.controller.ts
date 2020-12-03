import { HistoryAdapter } from 'src/database/history/history.adapter';
import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('history')
export class HistoryController {

    constructor(private historyAdp: HistoryAdapter) {}

    @Get('channels')
    public getChannels() {
        return this.historyAdp.getChannels();
    }

    @Get('channels/:channel') 
    public getHistory(@Param('channel') channel: string) {
        channel = channel[0] === '#' ? channel : '#'+channel;
        return this.historyAdp.getRepository().find({
            order: {
                id_log: 'DESC'
            },
            where: {
                channel
            }
        });
    }

}
