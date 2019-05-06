import {Component, OnInit} from '@angular/core';
import {Persona} from '../../entities/persona';
import {PersonaService} from '../../services/persona.service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TipoDocumentoService} from '../../services/tipo-documento.service';
import {TipoDocumento} from '../../entities/tipo-documento';
import {ToastrManager} from 'ng6-toastr-notifications';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css'],
  providers: [PersonaService, TipoDocumentoService, ToastrManager]
})
export class PersonaComponent implements OnInit {
  public personas: Array<Persona> = [];
  public pageSize = 2;
  public page = 1;
  public temp: Array<Persona> = [];
  public filterText: string;
  public tipoDocSel = 0;
  public personaSel: Persona;
  public tiposDocumento: TipoDocumento[];

  constructor(private _personaService: PersonaService,
              private _router: Router,
              private modalService: NgbModal,
              private _tipoDocumentoService: TipoDocumentoService,
              public toastr: ToastrManager) {
  }

  ngOnInit() {
    this.getPersonas();
    this.getTiposDocumento();
  }

  getPersonas() {
    this._personaService.getAll().subscribe(
      result => {
        this.temp = this.personas = result;
      }, error => {
         this.toastr.errorToastr('Error al retornar personas.', 'Error!',  {
           position: 'bottom-right'
         });
      }
      );
  }

  updateFilter() {
    this.personas = this.temp;
    if (this.filterText) {
      const filter = this.filterText.toUpperCase();
      this.personas = this.personas.filter(function (p) {
        return p.perNombre.toUpperCase().indexOf(filter) !== -1 || p.perApellido.toUpperCase().indexOf(filter) !== -1;
      });
    }

    if (this.tipoDocSel !== 0) {
      const filter = this.tipoDocSel;
      this.personas = this.personas.filter(function (p) {
        return p.perTipoDocumento.tpoId === filter;
      });
    }
  }

  newEdit(persona) {
    let personaSel = 0;
    if (persona) {
      personaSel = persona.perId;
    }
    this._router.navigate(['/persona/abm-persona', personaSel]);
  }

  delete(content, persona) {
    this.open(content, persona);
  }

  open(content, persona) {
    this.personaSel = persona;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this._personaService.delete(persona.perId).subscribe(result => {
        this.toastr.successToastr('Persona eliminada con éxito', 'Confirmación');
        this.getPersonas();
      }, error1 => {
        this.toastr.errorToastr('Error al retornar personas: ' + JSON.stringify(error1), 'Error!',  {
          position: 'bottom-right'
        });
      });
    }, (reason) => {
      this.toastr.infoToastr('Eliminación cancelada.', 'Info');
    });
  }

  getTiposDocumento() {
    this._tipoDocumentoService.getAll().subscribe(result => this.tiposDocumento = result);
  }

}
