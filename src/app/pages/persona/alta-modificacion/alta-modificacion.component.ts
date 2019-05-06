import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PersonaService} from '../../../services/persona.service';
import {TipoDocumento} from '../../../entities/tipo-documento';
import {TipoDocumentoService} from '../../../services/tipo-documento.service';
import {persona} from '../../../shared/api';
import {Persona} from '../../../entities/persona';
import {ToastrManager} from 'ng6-toastr-notifications';

@Component({
  selector: 'app-alta-modificacion',
  templateUrl: './alta-modificacion.component.html',
  styleUrls: ['./alta-modificacion.component.css'],
  providers: [PersonaService, TipoDocumentoService, ToastrManager]
})
export class AltaModificacionComponent implements OnInit {
  angForm: FormGroup;
  public parametros = {
    id: 0
  };
  public titulo: string;
  public tiposDocumento: TipoDocumento[];

  constructor(private fb: FormBuilder,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _personaService: PersonaService,
              private _tipoDocumentoService: TipoDocumentoService,
              public toastr: ToastrManager) {
    this.createForm();
  }

  ngOnInit() {
    this.getTiposDocumento();
    this._activatedRoute.params.forEach((params: Params) => {
      this.parametros.id = parseInt(params['prsId'], 10);
      this.titulo = this.parametros.id !== 0 ? 'Modificación de personas' : 'Alta de personas';
      if (this.parametros.id !== 0) {
        this.getPersonaById();
      } else {
        this.createForm();
      }
    });
  }

  createForm() {
    this.angForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      nroDocumento: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      tipoDocumento: ['', Validators.required]
    });
  }

  getPersonaById() {
    this._personaService.getById(this.parametros.id).subscribe(result => {
      this.setFormValues(result);
    });
  }

  getTiposDocumento() {
    this._tipoDocumentoService.getAll().subscribe(result => this.tiposDocumento = result);
  }

  setFormValues(persona: Persona) {
    this.angForm.controls['apellido'].setValue(persona.perApellido);
    this.angForm.controls['nombre'].setValue(persona.perNombre);
    this.angForm.controls['nroDocumento'].setValue(persona.perNumeroDocumento);
    this.angForm.controls['fechaNacimiento'].setValue(persona.perFechaNacimiento);
    this.angForm.controls['tipoDocumento'].setValue(persona.perTipoDocumento.tpoId);
  }

  goPersonas() {
    this._router.navigate(['/persona/consulta']);
  }

  save() {
    if (this.parametros.id !== 0) {
      this._personaService.update(this.makeDTO()).subscribe(result => {
        console.log('datos guardados');
        this.toastr.successToastr('Persona guardada correctamente.', 'Confirmación!', {
          position: 'bottom-right'
        });
        this.goPersonas();
      }, error1 => {
        this.toastr.errorToastr('Error guardando persona: ' + JSON.stringify(error1), 'Error!',  {
          position: 'bottom-right'
        });
      });
    } else {
      this._personaService.save(this.makeDTO()).subscribe(result => {
        console.log('datos guardados');
        this.toastr.successToastr('Persona guardada correctamente.', 'Exito!', {
          position: 'bottom-right'
        });
        this.goPersonas();
      }, error1 => {
        this.toastr.errorToastr('Error guardando persona: ' + JSON.stringify(error1), 'Error!',  {
          position: 'bottom-right'
        });
      });
    }
  }

  makeDTO(): any {
    return {
      perId: this.parametros.id !== 0 ? this.parametros.id : null,
      perNombre: this.angForm.controls['nombre'].value,
      perApellido: this.angForm.controls['apellido'].value,
      perTpoId: this.angForm.controls['tipoDocumento'].value,
      perNumeroDocumento: this.angForm.controls['nroDocumento'].value,
      perFechaNacimiento: new Date(this.angForm.controls['fechaNacimiento'].value)
    };
  }

}
