import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CommandsAdapter } from 'src/database/commands/commands.adapter';
import { Commands } from 'src/database/commands/commands.entity';
import { CommandDTO } from './commandDTO';

@Controller('commands')
export class CommandsController {

    constructor(private commandsAdp: CommandsAdapter) {}

    @Get() 
    public async getCommands(@Query('channel') channel?: string): Promise<Commands[]> {
        if(channel) {
            return this.commandsAdp.getRepository().find({targetchannel: channel})
        } else {
            return this.commandsAdp.getRepository().find();
        }
    }

    @Get('channels')
    public async getChannels(): Promise<string[]> {
        return this.commandsAdp.getChannelsOfCommands();
    }

    @Post()
    public async addCommand(@Body() command: CommandDTO) {
        return this.commandsAdp.getRepository().insert(command);
    }

    @Put('/:id')
    public async editCommand(@Body() command: CommandDTO, @Param('id') id: number) {
        return this.commandsAdp.getRepository().update({id_command: id}, command);
    }

    @Delete('/:id')
    public async deleteCommand(@Param('id') id: number) {
        return this.commandsAdp.getRepository().delete(id);
    }

}
