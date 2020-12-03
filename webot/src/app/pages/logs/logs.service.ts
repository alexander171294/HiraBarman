import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private httpC: HttpClient) { }

  getChannels(): Observable<string[]> {
    return this.httpC.get<string[]>(environment.botApi + '/history/channels');
  }

  getLogs(channel: string): Observable<LogData[]> {
    return this.httpC.get<LogData[]>(environment.botApi + '/history/channels/' + channel);
  }

}


export interface LogData {
  id_log: number;
  channel: string;
  author: string;
  message: string;
  date: Date;
}
