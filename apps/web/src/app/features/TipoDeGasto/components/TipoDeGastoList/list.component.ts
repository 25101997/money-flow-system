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

  ngOnInit(): void {
    this.tipoDeGastoService.getAll().subscribe({
      next: (data) => {
        this.data = data;
      },
      error: (err) => console.error('Erro al obtener todos los datos:', err)
    });
  }
  
}
