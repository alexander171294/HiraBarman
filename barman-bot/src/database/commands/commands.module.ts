import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Commands } from "./commands.entity";
import { CommandsAdapter } from "./commands.adapter";


@Module({
    imports: [TypeOrmModule.forFeature([Commands])],
    controllers: [

    ],
    providers: [
        CommandsAdapter
    ],
    exports: [
        CommandsAdapter
    ],
})
export class CommandsModule { }