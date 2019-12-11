import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../guard/auth.guard';
import { ResetComponent } from './reset/reset.component';
import { SinMoradorComponent } from './sin-morador/sin-morador.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'reset',
      component: ResetComponent,
    },
    {
      path: 'sinMorador',
      component: SinMoradorComponent,
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: HomeComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
