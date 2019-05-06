import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as api from '../shared/api';
import {environment} from '../../environments/environment';

@Injectable()
export class PersonaService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = environment.baseUrl + api.persona.path;
  }

  getAll() {
    return this._http.get<any>(this.url);
  }

  getById(id: number) {
    return this._http.get<any>(this.url + '/' + id);
  }

  save(personaDTO: any) {
    return this._http.post(this.url, personaDTO);
  }

  update(personaDTO: any) {
    return this._http.put(this.url, personaDTO);
  }

  delete(id: number) {
    return this._http.delete(this.url + '/' + id);
  }

}
