import { Controller, Get, Post, Put, Delete, Query, Body, Param } from '@nestjs/common';
import { VariableAdapter } from 'src/database/variables/variable.adapter';
import { VariableDTO } from './variableDTO';

@Controller('variables')
export class VariablesController {

    constructor(private variablAdp: VariableAdapter) {}

    @Get()
    public getVariables(@Query('channel') channel?: string, @Query('user') user?: string) {
        let opts: any = {};
        if(channel) {
            opts.channel = channel;
        }
        if(user) {
            opts.user = user;
        }
        return this.variablAdp.getRepository().find(opts);
    }

    @Get('users')
    public getUsersVariables() {
        return this.variablAdp.getUsersOfVariables();
    }

    @Get('channels')
    public getChannelsVaraibles() {
        return this.variablAdp.getChannelsOfVariables();
    }

    @Post()
    public addVariable(@Body() variable: VariableDTO) {
        return this.variablAdp.getRepository().insert(variable);
    }

    @Put('/:id')
    public editVariable(@Body() variable: VariableDTO, @Param('id') id: number) {
        return this.variablAdp.getRepository().update({id: id}, variable);
    }

    @Delete('/:id')
    public deleteVaraible(@Param('id') id: number) {
        return this.variablAdp.getRepository().delete(id);
    }

}
