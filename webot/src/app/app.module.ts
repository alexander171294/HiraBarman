import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComandosComponent } from './pages/comandos/comandos.component';
import { VariablesComponent } from './pages/variables/variables.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { LogsComponent } from './pages/logs/logs.component';
import { AddeditComponent } from './pages/comandos/addedit/addedit.component';
import { AddeditVariablesComponent } from './pages/variables/addedit/addedit.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { QuotesComponent } from './pages/quotes/quotes.component';


@NgModule({
  declarations: [
    AppComponent,
    ComandosComponent,
    VariablesComponent,
    ConfiguracionComponent,
    LogsComponent,
    AddeditComponent,
    AddeditVariablesComponent,
    QuotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgbModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    HttpClientModule,
    FormsModule,
    ProgressSpinnerModule,
    ButtonModule
  ],
  providers: [
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
