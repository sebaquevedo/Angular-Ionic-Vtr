import { NgModule } from '@angular/core';
import {
  NbCardModule,
  NbDatepickerModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { ResetComponent } from './reset.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ResetComponent,
  ],
  providers: [
  ],
})
export class ResetModule { }
