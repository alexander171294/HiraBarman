import { CommandDTO } from './command.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComandosService {

  constructor(private httpC: HttpClient) { }

  public getCommands(filters: Filters): Observable<CommandDTO[]> {
    let filterSTR = '';
    if (filters) {
      filterSTR = '?';
      if (filters.channel) {
        filterSTR += 'channel=' + encodeURIComponent(filters.channel);
      }
    }
    return this.httpC.get<CommandDTO[]>(environment.botApi + '/commands' + filterSTR);
  }

  public getChannels(): Observable<string[]> {
    return this.httpC.get<string[]>(environment.botApi + '/commands/channels');
  }

  public edit(id: number, comando: CommandDTO): Observable<any> {
    return this.httpC.put<any>(environment.botApi + '/commands/' + id, comando);
  }

  public create(comando: CommandDTO): Observable<any> {
    return this.httpC.post<any>(environment.botApi + '/commands', comando);
  }

  public delete(comando: CommandDTO): Observable<any> {
    return this.httpC.delete<any>(environment.botApi + '/commands/' + comando.id_command);
  }

}

export class Filters {
  channel?: string;
  user?: string;
}
