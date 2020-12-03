import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  constructor(private httpC: HttpClient) { }

  getQuotes(): Observable<Quote[]> {
    return this.httpC.get<Quote[]>(environment.botApi + '/quotes');
  }

  deleteQuote(id: number): Observable<void> {
    return this.httpC.delete<void>(environment.botApi + '/quotes/' + id);
  }

}

export interface Quote {
  id_quote: number;
  channel?: string;
  quote: string;
  author: string;
  quoteado: Date;
}
