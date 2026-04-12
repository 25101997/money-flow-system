import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/tipo-de-gasto-list/list.component';
import { AddComponent } from './components/tipo-de-gasto-add/add.component';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'add', component: AddComponent },
  { path: 'edit/:id', component: AddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoDeGastoRoutingModule {}
