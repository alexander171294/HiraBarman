import { Quotes } from './quotes.entity';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuotesAdapter } from './quotes.adapter';


@Module({
    imports: [TypeOrmModule.forFeature([Quotes])],
    controllers: [

    ],
    providers: [
        QuotesAdapter
    ],
    exports: [
        QuotesAdapter
    ],
})
export class QuotesModule { }