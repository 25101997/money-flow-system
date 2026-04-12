import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BitacoraGastosTipoListComponent } from './components/bitacora-gasto-tipo-list/bitacora-gastos-tipo-list.component';

const routes: Routes = [
  { path: 'list/tipo-de-gasto/:id', component: BitacoraGastosTipoListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BitacoraGastosRoutingModule {}
