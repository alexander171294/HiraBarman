import { Component, OnInit } from '@angular/core';
import { CommandDTO } from './command.dto';
import { ConfirmationService } from 'primeng/api';

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
  public editVisible: boolean = false;
  public isLoading: boolean = false;

  constructor(private confSrv: ConfirmationService) { }

  ngOnInit(): void {
  }

  deleteCommand(comando: CommandDTO) {
    console.log('Command dto');
    this.confSrv.confirm({
      message: 'Está seguro de eliminar este comando?',
      accept: () => {
        
      }
    });
  }

  editCommand(comando: CommandDTO) {
    console.log('EDIT');
    this.selectedCommand = comando;
    this.editVisible = true;
  }

}