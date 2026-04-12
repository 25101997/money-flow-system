import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BitacoraGastosRoutingModule } from './bitacora-gastos-routing.module';
import { BitacoraGastosTipoListComponent } from './components/bitacora-gasto-tipo-list/bitacora-gastos-tipo-list.component';

@NgModule({
  declarations: [
    BitacoraGastosTipoListComponent,
  ],
  imports: [
    CommonModule,
    BitacoraGastosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class BitacoraGastosModule { }
