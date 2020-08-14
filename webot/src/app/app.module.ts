import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComandosComponent } from './pages/comandos/comandos.component';
import { VariablesComponent } from './pages/variables/variables.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { LogsComponent } from './pages/logs/logs.component';

@NgModule({
  declarations: [
    AppComponent,
    ComandosComponent,
    VariablesComponent,
    ConfiguracionComponent,
    LogsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
