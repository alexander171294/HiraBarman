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

  public comandos: CommandDTO[] = [
    {
      command: 'asder',
      response: 'asdqwe'
    }
  ];

  public selectedCommand: CommandDTO;
  public editVisible: boolean;
  public isLoading: boolean;

  constructor(private confSrv: ConfirmationService, private cmdSrv: ComandosService) { }

  ngOnInit(): void {
  }

  deleteCommand(comando: CommandDTO): void {
    console.log('Command dto');
    this.confSrv.confirm({
      message: 'Está seguro de eliminar este comando?',
      accept: () => {

      }
    });
  }

  editCommand(comando: CommandDTO): void {
    this.selectedCommand = comando;
    this.editVisible = true;
  }

}
