import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { HomeModule } from './home/home.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ResetModule } from './reset/reset.module';
import { SinMoradorModule } from './sin-morador/sin-morador.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    HomeModule,
    ResetModule,
    SinMoradorModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
