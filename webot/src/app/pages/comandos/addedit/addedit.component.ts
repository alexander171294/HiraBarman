import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-addedit-commands',
  templateUrl: './addedit.component.html',
  styleUrls: ['./addedit.component.scss']
})
export class AddeditComponent implements OnInit {

  @Input() editMode: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
