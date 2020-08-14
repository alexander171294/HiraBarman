import { Component, OnInit } from '@angular/core';
import { CommandDTO } from './command.dto';

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

  constructor() { }

  ngOnInit(): void {
  }

}