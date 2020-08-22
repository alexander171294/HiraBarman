import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VariableDTO, FiltersVars } from './variables.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  constructor(private httpC: HttpClient) { }

  public getVars(filters: FiltersVars): Observable<VariableDTO[]> {
    let filterSTR = '';
    if (filters) {
      filterSTR = '?';
      if (filters.channel) {
        filterSTR += 'channel=' + encodeURIComponent(filters.channel);
      }
      if (filters.username) {
        if (filters.channel) {
          filterSTR += '&';
        }
        filterSTR += 'username=' + encodeURIComponent(filters.username);
      }
    }
    return this.httpC.get<VariableDTO[]>(environment.botApi + '/variables' + filterSTR);
  }

  public getChannels(): Observable<string[]> {
    return this.httpC.get<string[]>(environment.botApi + '/variables/channels');
  }

  public getUsers(): Observable<string[]> {
    return this.httpC.get<string[]>(environment.botApi + '/variables/users');
  }

  public edit(id: number, comando: VariableDTO): Observable<any> {
    return this.httpC.put<any>(environment.botApi + '/variables/' + id, comando);
  }

  public create(variable: VariableDTO): Observable<any> {
    return this.httpC.post<any>(environment.botApi + '/variables', variable);
  }

  public delete(variable: VariableDTO): Observable<any> {
    return this.httpC.delete<any>(environment.botApi + '/variable/' + variable.id);
  }

}
