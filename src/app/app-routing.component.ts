import {RouterModule, Routes} from '@angular/router';
import {ROUTES} from './shared/routes';
import {NgModule} from '@angular/core';
import {FullLayoutComponent} from './layouts/full/full-layout.component';

export const ROUTES_MAIN: Routes = [
  {
    path: '',
    redirectTo: 'persona/consulta',
    pathMatch: 'full',
  },
  {path: '', component: FullLayoutComponent, children: ROUTES}
];


@NgModule({
  imports: [RouterModule.forRoot(ROUTES_MAIN, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
