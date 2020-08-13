import { Controller, Post, Body } from '@nestjs/common';
import { CoreService } from 'src/core/core.service';
import { MessageDTO } from './MessageDTO';

@Controller('chat')
export class ChatController {

    constructor(private core: CoreService) {}

    @Post()
    async sendMessage(@Body() message: MessageDTO) {
        this.core.send(message.channel, message.message);
    }

}
