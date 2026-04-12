import { Component } from '@angular/core';
import { BitacoraGastosService } from '../../services/bitacora-gastos.service';
import { BitacoraGastosRead } from '../../models/bitacora-gastos.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bitacora-gastos-tipo-list',
  templateUrl: './bitacora-gastos-tipo-list.component.html',
  styleUrls: ['./bitacora-gastos-tipo-list.component.scss']
})
export class BitacoraGastosTipoListComponent {
  
  data: BitacoraGastosRead[] = [];
  idTipoDeGasto: number | null = null;
  cargando = false;
  error: string | null = null;

  constructor(
    private bitacoraGastosService: BitacoraGastosService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.readIdFromUrl();
  }

  private readIdFromUrl(): void {
    const idURL = this.route.snapshot.paramMap.get('id');
    if (idURL) {
      this.idTipoDeGasto = Number(idURL);
      this.loadData(this.idTipoDeGasto);
    }
  }

  private loadData(idTipoDeGasto: number): void {
    this.cargando = true;
    this.error = null;
    this.bitacoraGastosService.getByTipoDeGasto(idTipoDeGasto).subscribe({
      next: (data) => {
        this.data = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al obtener bitácora por tipo de gasto', err);
        this.error = 'No se pudo cargar la información.';
        this.cargando = false;
      }
    });
  }
}
