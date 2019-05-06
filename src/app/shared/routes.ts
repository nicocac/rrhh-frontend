import {Routes} from '@angular/router';

export const ROUTES: Routes = [
    {
      path: 'persona',
      loadChildren: './pages/persona/persona.module#PersonaModule'
    }
  ]
;
