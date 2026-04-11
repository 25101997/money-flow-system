import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TipoDeGastoRoutingModule } from './tipo-de-gasto-routing.module';
import { ListComponent } from './components/TipoDeGastoList/list.component';

@NgModule({
  declarations: [
    ListComponent,
  ],
  imports: [
    CommonModule,
    TipoDeGastoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TipoDeGastoModule { }
