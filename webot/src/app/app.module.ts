import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComandosComponent } from './pages/comandos/comandos.component';
import { VariablesComponent } from './pages/variables/variables.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { LogsComponent } from './pages/logs/logs.component';
import { AddeditComponent } from './pages/comandos/addedit/addedit.component';
import { AddeditVariablesComponent } from './pages/variables/addedit/addedit.component';



@NgModule({
  declarations: [
    AppComponent,
    ComandosComponent,
    VariablesComponent,
    ConfiguracionComponent,
    LogsComponent,
    AddeditComponent,
    AddeditVariablesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule
  ],
  providers: [
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
