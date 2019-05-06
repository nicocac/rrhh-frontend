import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PersonaComponent} from './persona.component';
import {AltaModificacionComponent} from './alta-modificacion/alta-modificacion.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'consulta',
        component: PersonaComponent,
        data: {
          title: 'Persona'
        }
      },
      {
        path: 'abm-persona/:prsId',
        component: AltaModificacionComponent,
        data: {
          title: 'Alta Persona'
        }
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonaRoutingModule {
}
