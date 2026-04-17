import { Component } from '@angular/core';
import { BitacoraGastosService } from '../../services/bitacora-gastos.service';
import { TipoDeGastoService } from 'src/app/features/tipo-de-gasto/services/tipo-de-gasto.service';
import { BitacoraGastosRead } from '../../models/bitacora-gastos.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoDeGastoRead } from 'src/app/features/tipo-de-gasto/models/tipo-de-gasto.model';

@Component({
  selector: 'app-bitacora-gastos-tipo-list',
  templateUrl: './bitacora-gastos-tipo-list.component.html',
  styleUrls: ['./bitacora-gastos-tipo-list.component.scss']
})
export class BitacoraGastosTipoListComponent {

  constructor(
    private bitacoraGastosService: BitacoraGastosService,
    private tipoDeGastoService: TipoDeGastoService,
    private route: ActivatedRoute,
  ) {}

  data: BitacoraGastosRead[] = [];
  idTipoDeGasto: number | null = null;
  tipoDeGasto: TipoDeGastoRead | null = null;
  cargando = false;
  error: string | null = null;
  saldo: number = 0;

  ngOnInit(): void {
    this.getParamsFromUrl();
    this.readIdFromUrl();
  }

  private getParamsFromUrl(): void {
    this.route.queryParams.subscribe(params => {
      const idTipoDeGasto = Number(params['idTipoDeGasto']);
      if (!(!idTipoDeGasto || idTipoDeGasto <= 0)) {
        this.idTipoDeGasto = idTipoDeGasto;
        this.loadTipoDeGasto(idTipoDeGasto);
      }
    });
  }

  private readIdFromUrl(): void {
    const idURL = this.route.snapshot.paramMap.get('id');
    if (idURL) {
      this.idTipoDeGasto = Number(idURL);
      this.getAllBitacoraGastosFilerByTipoDeGasto(this.idTipoDeGasto);
      this.loadTipoDeGasto(this.idTipoDeGasto);
    }
  }

  private loadTipoDeGasto(idTipoDeGasto:number): void{
    this.tipoDeGastoService.getById(idTipoDeGasto).subscribe({
        next: (data) => {
          this.tipoDeGasto = data;
          this.getAllBitacoraGastosFilerByTipoDeGasto(idTipoDeGasto);
        },
        error: (err) => {
          console.error('Error al obtener los datos.', err);
          this.error = 'No se pudo cargar el tipo de gasto.';
          this.tipoDeGasto = null;
          this.data = [];
          this.cargando = false;
        }
    });
  }
  
  private getAllBitacoraGastosFilerByTipoDeGasto(idTipoDeGasto: number): void {
    this.cargando = true;
    this.error = null;
    let debitado = 0;
    let acreditado = 0;
    this.bitacoraGastosService.getByTipoDeGasto(idTipoDeGasto).subscribe({
      next: (data) => {
        this.data = data;

        this.data.forEach((item) => {
          if (item.debitado) {
            debitado += Number(item.monto);
          } else {
            acreditado += Number(item.monto);
          }
        });

        this.saldo = acreditado - debitado;
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