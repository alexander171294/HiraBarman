import { QuotesAdapter } from './../../database/quotes/quotes.adapter';
import { Controller, Delete, Get, Param } from '@nestjs/common';

@Controller('quotes')
export class QuotesController {

    constructor(private quotesAdp: QuotesAdapter) { }

    @Get()
    public getQuotes() {
        return this.quotesAdp.getRepository().find();
    }

    @Delete(':id')
    public deleteQuote(@Param('id') id: number) {
        return this.quotesAdp.getRepository().delete(id);
    }

}
