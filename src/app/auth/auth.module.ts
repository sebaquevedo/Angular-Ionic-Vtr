import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { AuthComponent } from './auth.component';
import { LoginModule } from './login/login.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    AuthRoutingModule,
    ThemeModule,
    NbMenuModule,
    LoginModule,
  ],
  declarations: [
    AuthComponent,
  ],
})
export class AuthModule {
}
