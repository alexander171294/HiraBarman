import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Quote, QuotesService } from './quotes.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

  public quotes: Quote[];
  public cargando = true;

  constructor(private qSrv: QuotesService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.getQuotes();
  }

  getQuotes(): void {
    this.cargando = true;
    this.qSrv.getQuotes().subscribe(d => {
      this.quotes = d;
      this.cargando = false;
    });
  }

  delete(id: number): void {
    this.qSrv.deleteQuote(id).subscribe(r => {
      // toast
      this.toast.error('Quote eliminado');
      this.getQuotes();
    });
  }

}
