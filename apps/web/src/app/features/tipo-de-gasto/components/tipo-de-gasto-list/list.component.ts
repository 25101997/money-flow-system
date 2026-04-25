import { Component } from '@angular/core';
import { TipoDeGastoService } from '../../services/tipo-de-gasto.service';
import { TipoDeGastoRead } from '../../models/tipo-de-gasto.model';
import { SessionService } from 'src/app/features/auth/services/session.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  
  user: any;
  data: TipoDeGastoRead[] = [];

  constructor(
    private tipoDeGastoService: TipoDeGastoService,
    private sessionService: SessionService
  ) {}

  tipodecuenta = 'monetaria';
  ingreso = 9500;
  disponible = 0;
  total = 0;

  ngOnInit(): void {

    this.user = this.sessionService.getUser();

    if(!this.user) return;

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
