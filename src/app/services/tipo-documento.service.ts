import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as api from '../shared/api';
import {environment} from '../../environments/environment';

@Injectable()
export class TipoDocumentoService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = environment.baseUrl + api.tipoDocumento.path;
  }

  getAll() {
    return this._http.get<any>(this.url);
  }

}
