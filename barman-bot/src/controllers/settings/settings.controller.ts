import { Controller, Get, Post, Body, Delete, Query, Put } from '@nestjs/common';
import { CoreService } from 'src/core/core.service';
import { get } from 'http';
import { botCFG } from 'src/environment/bot';

@Controller('settings')
export class SettingsController {

    constructor(private coreSrv: CoreService) { }

    @Get('nick')
    public getNick(): string {
        return this.coreSrv.getNick();
    }

    @Put('nick')
    public setNick(@Query('nick') nick: string): string {
        this.coreSrv.setNick(nick);
        return nick;
    }

    @Post('command')
    public sendCommand(@Body() command): string {
        console.log('command', command.command);
        try {
            this.coreSrv.sendRaw(command.command);
            return '';
        } catch(err) {
            return 'error';
        }
    }

    @Get('channels')
    public getChannels(): any {
        return this.coreSrv.getChannels();
    }

    @Post('channels')
    public joinChannel(@Query('chan') chan: string): any {
        this.coreSrv.join('#' + chan);
        return this.coreSrv.getChannels();
    }

    @Delete('channels')
    public leaveChannel(@Query('chan') chan: string): any {
        this.coreSrv.leave('#' + chan);
        return this.coreSrv.getChannels();
    }

    @Get('owners')
    public getOwners(): any {
        return botCFG.owners;
    }

    @Put('owners')
    public setOwners(@Body() owners: string[]): any {
        botCFG.owners = owners;
        return botCFG.owners;
    }

}
