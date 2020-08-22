import { VariablesService } from './variables.service';
import { Component, OnInit } from '@angular/core';
import { FiltersVars, VariableDTO } from './variables.dto';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.scss']
})
export class VariablesComponent implements OnInit {

  public isLoading: boolean;
  public channelSelected: string;
  public usuarioSelected: string;
  public nickSelected: string;
  public variables: VariableDTO[];

  public usuarios: string[] = [];
  public channels: string[] = [];

  public creando: boolean;
  public editVisible: boolean;
  public newVariable: VariableDTO = new VariableDTO();
  public selectedVariable: VariableDTO = new VariableDTO();

  constructor(private confSrv: ConfirmationService, private variablesSrv: VariablesService) { }

  ngOnInit(): void {
    this.variablesSrv.getUsers().subscribe(dataU => {
      this.usuarios = dataU;
      this.variablesSrv.getChannels().subscribe(dataC => {
        this.channels = dataC;
        this.getDataGrid();
      });
    });
  }

  getDataGrid(): void {
    this.isLoading = true;
    const filters: FiltersVars = {};
    if (this.channelSelected) {
      filters.channel = this.channelSelected;
    }
    if (this.channelSelected) {
      filters.username = this.nickSelected;
    }
    this.variablesSrv.getVars(filters).subscribe(vars => {
      this.isLoading = false;
      this.variables = vars;
    });
  }

  deleteVariable(variable: VariableDTO): void {
    this.confSrv.confirm({
      message: 'Está seguro de eliminar este comando?',
      accept: () => {
        this.variablesSrv.delete(variable);
        this.getDataGrid();
      }
    });
  }

  editVariable(variable: VariableDTO): void {
    this.selectedVariable = variable;
    this.editVisible = true;
  }

  selectChannel(channel: string): void {
    this.channelSelected = channel;
    this.getDataGrid();
  }

  selectUsuarios(usuario: string): void {
    this.usuarioSelected = usuario;
    this.getDataGrid();
  }

  saveChange(variable: VariableDTO): void {
    this.editVisible = false;
    this.creando = true;
    this.variablesSrv.edit(variable.id, variable).subscribe(r => {
      this.creando = false;
      this.getDataGrid();
    });
  }

  addVariable(variable: VariableDTO): void {
    this.creando = true;
    this.variablesSrv.create(variable).subscribe(r => {
      this.creando = false;
      this.getDataGrid();
      this.newVariable = new VariableDTO();
    });
  }

}
