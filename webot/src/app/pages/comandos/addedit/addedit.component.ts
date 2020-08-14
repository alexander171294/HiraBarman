import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-addedit-commands',
  templateUrl: './addedit.component.html',
  styleUrls: ['./addedit.component.scss']
})
export class AddeditComponent implements OnInit {

  @Input() editMode: boolean;
  @Output() saved: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  save() {
    this.saved.emit();
    if (this.editMode) {
      
    } else {

    }
  }

}
