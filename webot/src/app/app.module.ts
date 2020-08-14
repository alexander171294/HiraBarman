import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
