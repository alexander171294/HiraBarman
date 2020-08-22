import { Component, OnInit } from '@angular/core';
import { CommandDTO } from './command.dto';
import { ConfirmationService } from 'primeng/api';
import { ComandosService } from './comandos.service';

@Component({
  selector: 'app-comandos',
  templateUrl: './comandos.component.html',
  styleUrls: ['./comandos.component.scss']
})
export class ComandosComponent implements OnInit {

  public comandos: CommandDTO[] = [];

  public selectedCommand: CommandDTO = new CommandDTO();
  public newCommand: CommandDTO = new CommandDTO();
  public editVisible: boolean;
  public isLoading: boolean;
  public creando: boolean;
  public channels: string[] = [];
  public channelSelected: string;

  constructor(private confSrv: ConfirmationService, private cmdSrv: ComandosService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.cmdSrv.getChannels().subscribe(chnls => {
      this.channels = chnls;
      this.getDataGrid();
    });
  }

  getDataGrid(): void {
    this.isLoading = true;
    const filters: any = {};
    if (this.channelSelected) {
      filters.channel = this.channelSelected;
    }
    this.cmdSrv.getCommands(filters).subscribe(cmds => {
      this.isLoading = false;
      this.comandos = cmds;
    });
  }

  deleteCommand(comando: CommandDTO): void {
    this.confSrv.confirm({
      message: 'Está seguro de eliminar este comando?',
      accept: () => {
        this.cmdSrv.delete(comando).subscribe();
        this.getDataGrid();
      }
    });
  }

  editCommand(comando: CommandDTO): void {
    this.selectedCommand = comando;
    this.editVisible = true;
  }

  selectChannel(channel: string): void {
    this.channelSelected = channel;
    this.getDataGrid();
  }

  saveChange(comando: CommandDTO): void {
    this.editVisible = false;
    this.creando = true;
    this.cmdSrv.edit(comando.id_command, comando).subscribe(r => {
      this.creando = false;
      this.getDataGrid();
    });
  }

  addCommand(comando: CommandDTO): void {
    this.creando = true;
    this.cmdSrv.create(comando).subscribe(r => {
      this.creando = false;
      this.getDataGrid();
      this.newCommand = new CommandDTO();
    });
  }

}
