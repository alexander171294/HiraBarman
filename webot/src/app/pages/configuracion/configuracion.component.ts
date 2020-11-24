import { ConfiguracionesService } from './configuraciones.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  public owners: string;
  public nick: string;
  public newNick: string;
  public channels: any[];

  public command: string;
  public channel: string;

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
      this.owners = owners.join(',');
    });
  }

  changeNick() {
    this.cfgSrv.setNick(this.newNick).subscribe(r => {
      this.newNick = '';
      // ok
    }, err => {
      // err
    });
  }

  joinChannel() {
    this.cfgSrv.joinChannel(this.channel.replace('#', '')).subscribe(r => {
      this.channel = '';
      // ok
    }, err => {
      // err
    });
  }

  sendCommand() {
    this.cfgSrv.sendCommand(this.command).subscribe(r => {
      this.command = '';
      // ok
    }, err => {
      // err
    });
  }

  updateOwners() {
    this.cfgSrv.setOwners(this.owners.split(',')).subscribe(r => {
      this.owners = r.join(',');
      // ok
    }, err => {
      // err
    });
  }

}
