import { ConfiguracionesService } from './configuraciones.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  public owners: string[];
  public nick: string;
  public newNick: string;
  public channels: any[];

  constructor(private cfgSrv: ConfiguracionesService) { }

  ngOnInit(): void {
    this.cfgSrv.getChannels().subscribe(channels => {
      this.channels = channels;
    });
    this.cfgSrv.getNick().subscribe(nick => {
      this.nick = nick;
      this.newNick = nick;
    });
    this.cfgSrv.getOwners().subscribe(owners => {
      this.owners = owners;
    });
  }



}
