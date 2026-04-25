import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TipoDeGastoRoutingModule } from './tipo-de-gasto-routing.module';
import { ListComponent } from './components/tipo-de-gasto-list/list.component';
import { AddComponent } from './components/tipo-de-gasto-add/add.component';

@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
  ],
  imports: [
    CommonModule,
    TipoDeGastoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TipoDeGastoModule { }
