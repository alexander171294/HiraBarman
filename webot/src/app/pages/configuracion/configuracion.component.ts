import { ConfiguracionesService } from './configuraciones.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private cfgSrv: ConfiguracionesService, private toastr: ToastrService) { }

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
      this.toastr.success('Cambio de nick', 'Nuevo nick: ' + this.nick);
      this.newNick = '';
    }, err => {
      this.toastr.error('No se pudo actualizar el nick.');
    });
  }

  joinChannel() {
    this.cfgSrv.joinChannel(this.channel.replace('#', '')).subscribe(r => {
      this.toastr.success('Nuevo canal', 'Unido al canal: ' + this.channel);
      this.channel = '';
    }, err => {
      this.toastr.error('No se pudo ingresar al canal.');
    });
  }

  sendCommand() {
    this.cfgSrv.sendCommand(this.command).subscribe(r => {
      this.toastr.success('Ejecución de comando', 'Comando ejecutado: ' + this.command);
      this.command = '';
    }, err => {
      this.toastr.error('No se pudo ejecutar el comando.');
    });
  }

  updateOwners() {
    this.cfgSrv.setOwners(this.owners.split(',')).subscribe(r => {
      this.toastr.success('Owners', 'Owners: ' + r.join(','));
      this.owners = r.join(',');
    }, err => {
      this.toastr.error('No se pudieron actualizar los owners.');
    });
  }

}
