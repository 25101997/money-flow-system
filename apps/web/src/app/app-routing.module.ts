import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(h => h.HomeModule)
  },
  {
    path: 'tipo-de-gasto',
    loadChildren: () => import('./features/tipo-de-gasto/tipo-de-gasto.module').then(tdg => tdg.TipoDeGastoModule)
  },
  {
    path: 'bitacora-gastos',
    loadChildren: () => import('./features/bitacora-gastos/bitacora-gastos.module').then(bg => bg.BitacoraGastosModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}