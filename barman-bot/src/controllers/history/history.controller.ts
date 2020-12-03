import { HistoryAdapter } from 'src/database/history/history.adapter';
import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('history')
export class HistoryController {

    constructor(private historyAdp: HistoryAdapter) {}

    @Get('channels')
    public getChannels() {
        return this.historyAdp.getChannels();
    }

    @Get(':channel') 
    public getHistory(@Param('channel') channel: string) {
        return this.historyAdp.getRepository().find({
            channel
        });
    }

}
