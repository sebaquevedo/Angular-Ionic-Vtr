import { NgModule } from '@angular/core';
import { NbDatepickerModule, NbCardModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SinMoradorComponent } from './sin-morador.component';

@NgModule({
  imports: [
    ThemeModule,
    NbDatepickerModule,
    NbCardModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SinMoradorComponent,
  ],
  providers: [
  ],
})
export class SinMoradorModule { }
