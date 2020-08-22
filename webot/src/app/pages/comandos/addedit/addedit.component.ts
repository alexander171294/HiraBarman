import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommandDTO } from '../command.dto';

@Component({
  selector: 'app-addedit-commands',
  templateUrl: './addedit.component.html',
  styleUrls: ['./addedit.component.scss']
})
export class AddeditComponent implements OnInit {

  @Input() editMode: boolean;
  @Input() comando: CommandDTO;
  @Output() saved: EventEmitter<CommandDTO> = new EventEmitter<CommandDTO>();

  constructor() { }

  ngOnInit(): void { }

  save(): void {
    this.saved.emit(this.comando);
  }

}
