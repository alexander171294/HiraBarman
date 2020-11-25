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
    this.getChannels();
    this.cfgSrv.getNick().subscribe(nick => {
      this.nick = nick;
      this.newNick = nick;
    });
    this.cfgSrv.getOwners().subscribe(owners => {
      this.owners = owners.join(',');
    });
  }

  getChannels(): void {
    this.cfgSrv.getChannels().subscribe(channels => {
      const chnls = [];
      Object.entries(channels).forEach(e => {
        console.log('Channel: ',e);
        chnls.push(e[1]);
      });
      this.channels = chnls;
      console.log(chnls);
    });
  }

  changeNick(): void {
    this.cfgSrv.setNick(this.newNick).subscribe(r => {
      this.toastr.success('Cambio de nick', 'Nuevo nick: ' + this.nick);
      this.newNick = '';
    }, err => {
      this.toastr.error('No se pudo actualizar el nick.');
    });
  }

  joinChannel(): void {
    this.cfgSrv.joinChannel(this.channel.replace('#', '')).subscribe(r => {
      this.toastr.success('Nuevo canal', 'Unido al canal: ' + this.channel);
      setTimeout(() => {
        this.getChannels();
      }, 250);
      this.channel = '';
    }, err => {
      this.toastr.error('No se pudo ingresar al canal.');
    });
  }

  leave(chnl: string): void {
    this.cfgSrv.leaveChannel(chnl.replace('#', '')).subscribe(r => {
      this.toastr.success('Salir del canal', 'Me salí del canal: ' + chnl);
      setTimeout(() => {
        this.getChannels();
      }, 250);
    }, err => {
      this.toastr.error('No se pudo ingresar al canal.');
    });
  }

  sendCommand(): void {
    this.cfgSrv.sendCommand(this.command).subscribe(r => {
      this.toastr.success('Ejecución de comando', 'Comando ejecutado: ' + this.command);
      this.command = '';
    }, err => {
      this.toastr.error('No se pudo ejecutar el comando.');
    });
  }

  updateOwners(): void {
    this.cfgSrv.setOwners(this.owners.split(',')).subscribe(r => {
      this.toastr.success('Owners', 'Owners: ' + r.join(','));
      this.owners = r.join(',');
    }, err => {
      this.toastr.error('No se pudieron actualizar los owners.');
    });
  }

}
