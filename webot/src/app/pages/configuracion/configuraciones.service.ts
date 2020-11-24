import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionesService {

  constructor(private httpC: HttpClient) { }

  public getNick(): Observable<string> {
    return this.httpC.get(environment.botApi + '/settings/nick', {responseType: 'text'});
  }

  public sendCommand(command: string): Observable<string> {
    return this.httpC.post(environment.botApi + '/settings/command', {command}, {responseType: 'text'});
  }

  public setNick(nick: string): Observable<string> {
    return this.httpC.put(environment.botApi + '/settings/nick?nick=' + nick, {}, {responseType: 'text'});
  }

  public getChannels(): Observable<string[]> {
    return this.httpC.get<string[]>(environment.botApi + '/settings/channels');
  }

  public joinChannel(channel: string): Observable<string[]> {
    return this.httpC.post<string[]>(environment.botApi + '/settings/channels?chan=' + channel, {});
  }

  public leaveChannel(channel: string): Observable<string[]> {
    return this.httpC.delete<string[]>(environment.botApi + '/settings/channels?chan=' + channel);
  }

  public getOwners(): Observable<string[]> {
    return this.httpC.get<string[]>(environment.botApi + '/settings/owners');
  }

  public setOwners(owners: string[]): Observable<string[]> {
    return this.httpC.put<string[]>(environment.botApi + '/settings/owners', owners);
  }
}
