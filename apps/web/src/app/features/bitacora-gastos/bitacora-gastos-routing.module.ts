import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BitacoraGastosTipoListComponent } from './components/bitacora-gasto-tipo-list/bitacora-gastos-tipo-list.component';
import { BitacoraGastosAddComponent } from './components/bitacora-gastos-add/bitacora-gastos-add.component';

const routes: Routes = [
  { path: 'list/tipo-de-gasto/:id', component: BitacoraGastosTipoListComponent },
  { path: 'list/tipo-de-gasto', component: BitacoraGastosTipoListComponent },
  { path: 'add', component: BitacoraGastosAddComponent },
  { path: 'edit/:id', component: BitacoraGastosAddComponent },
  { path: 'edit', component: BitacoraGastosAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BitacoraGastosRoutingModule {}
