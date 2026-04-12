import { Component } from '@angular/core';
import { TipoDeGastoService } from '../../services/tipo-de-gasto.service';
import { TipoDeGastoRead } from '../../models/tipo-de-gasto.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  
  data: TipoDeGastoRead[] = [];

  constructor(private tipoDeGastoService: TipoDeGastoService) {}

  tipodecuenta = 'monetaria';
  ingreso = 9500;
  disponible = 0;
  total = 0;

  ngOnInit(): void {
    this.tipoDeGastoService.getAll().subscribe({
      next: (data) => {
        this.data = data;
        this.total = data.reduce((acc, item) => acc + item.montoMaximo, 0);
        this.disponible = this.ingreso - this.total;
      },
      error: (err) => console.error('Erro al obtener todos los datos:', err)
    });
  }
  
}
