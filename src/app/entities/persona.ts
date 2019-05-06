import {TipoDocumento} from './tipo-documento';

export class Persona {
  constructor(public perId: number,
              public perNombre: string,
              public perApellido: string,
              public perTipoDocumento: TipoDocumento,
              public perNumeroDocumento: number,
              public perFechaNacimiento: string) {
  }
}
