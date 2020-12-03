import { ConfiguracionesService } from './../configuracion/configuraciones.service';
import { LogData, LogsService } from './logs.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  public cargando: boolean;
  public channels: string[];
  public logs: LogData[];
  public canalSeleccionado: string;
  public message: string;

  constructor(private logSrv: LogsService, private cfgSrv: ConfiguracionesService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.logSrv.getChannels().subscribe(channels => {
      this.cargando = false;
      this.channels = channels;
    });
  }

  public selectChannel(channel: string): void {
    this.canalSeleccionado = channel;
    this.cargando = true;
    this.logSrv.getLogs(channel.slice(1)).subscribe(logs => {
      this.cargando = false;
      this.logs = logs;
    });
  }

  public kp(evt) {
    if (evt.keyCode === 13) {
      this.cfgSrv.say(this.canalSeleccionado.slice(1), this.message);
      const elem: any = document.getElementById('messenger');
      elem.value = '';
      elem.focus();
    }
  }

}
