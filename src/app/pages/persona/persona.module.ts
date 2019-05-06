import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {AltaPersonaComponent} from './abm/alta-persona.component';
import {PersonaComponent} from './persona.component';
import {PersonaRoutingModule} from './persona-routing.module';
import { AltaModificacionComponent } from './alta-modificacion/alta-modificacion.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatExpansionModule} from '@angular/material/expansion';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PersonaRoutingModule,
    NgbModule,
    MatExpansionModule
  ],
  declarations: [
    PersonaComponent,
    AltaModificacionComponent
  ]
})
export class PersonaModule {
}
