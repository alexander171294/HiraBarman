import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HistoryAdapter } from "./history.adapter";
import { HistoryEntity } from "./history.entity";


@Module({
    imports: [TypeOrmModule.forFeature([HistoryEntity])],
    controllers: [

    ],
    providers: [
        HistoryAdapter
    ],
    exports: [
        HistoryAdapter
    ],
})
export class HistoryModule { }