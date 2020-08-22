import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VariableDTO } from '../variables.dto';

@Component({
  selector: 'app-addedit-variables',
  templateUrl: './addedit.component.html',
  styleUrls: ['./addedit.component.scss']
})
export class AddeditVariablesComponent implements OnInit {

  @Input() variable: VariableDTO;
  @Input() editMode: boolean;
  @Output() saved: EventEmitter<VariableDTO> = new EventEmitter<VariableDTO>();

  constructor() {

  }

  ngOnInit(): void {

  }

  save(): void {
    this.saved.emit(this.variable);
  }

}
