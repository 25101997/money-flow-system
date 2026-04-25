import { Component } from '@angular/core';
import { BitacoraGastosService } from '../../services/bitacora-gastos.service';
import { TipoDeGastoService } from 'src/app/features/tipo-de-gasto/services/tipo-de-gasto.service';

import { ActivatedRoute, Router } from '@angular/router';

// form imports
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'; 
import { TipoDeGastoRead } from 'src/app/features/tipo-de-gasto/models/tipo-de-gasto.model';
import { BitacoraGastosRead } from '../../models/bitacora-gastos.model';

@Component({
  selector: 'app-bitacora-gastos-add',
  templateUrl: './bitacora-gastos-add.component.html',
  styleUrls: ['./bitacora-gastos-add.component.scss']
})
export class BitacoraGastosAddComponent {

  constructor(
    private bitacoraGastosService: BitacoraGastosService,
    private tipoDeGastoService: TipoDeGastoService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  isEditMode = false;
  id: number | null = null;
  idTipoDeGasto: number | null = null;
  idBitacoraGastos: number | null = null;
  tipoDeGasto: TipoDeGastoRead | null = null;
  cargando = false;
  error: string | null = null;
  form!: FormGroup;
  tiposDeGasto: TipoDeGastoRead[] = [];

  // Inicio de programa
  ngOnInit(){
    this.initFrom();
    this.readIdFromUrl();
    this.getAllTiposDeGasto();
  }

  private initFrom(): void {
    this.form = this.formBuilder.group({
      idBitacoraGastos: [null],
      idTipoDeGasto: [null, Validators.required],
      descripcion: [null, Validators.required],
      debitado: [null],
      acreditado: [null],
      tipoMovimiento: [null, Validators.required],
      monto: [null, [
        Validators.required,
        Validators.min(1),
        Validators.max(99999),
      ]],
      mes: [null, Validators.required],
      anio: [null, Validators.required],
      observaciones: [null]
    });
  }

  private readIdFromUrl(): void {
    this.route.queryParams.subscribe(params => {
      if(params){
        const idTipoDeGasto = Number(params['idTipoDeGasto']);
        const idBitacoraGastos = Number(params['idBitacoraGastos']);

        if(!(!idTipoDeGasto || idTipoDeGasto <=0)){
          this.getByIdTipoDeGasto(idTipoDeGasto);
        }

        if(!(!idBitacoraGastos || idBitacoraGastos <=0)){
          this.getByIdBitacoraGastos(idBitacoraGastos);
        }
      }
    });
  }

  private getAllTiposDeGasto(): void {
    this.tipoDeGastoService.getAll().subscribe({
      next: (data) => {
        this.tiposDeGasto = data;
      },
      error: (err) => console.error('Erro al obtener todos los datos:', err)
    });
  }

  private getByIdTipoDeGasto(idTipoDeGasto:number): void{
    this.tipoDeGastoService.getById(idTipoDeGasto).subscribe({
      next: (data) => {
        this.tipoDeGasto = data;
        this.idTipoDeGasto = data.idTipoDeGasto;
        this.form.patchValue({
          idTipoDeGasto: data.idTipoDeGasto
        });
      },
      error: (err) => {
        console.error('Error al obtener los datos.', err);
        this.error = 'No se pudo cargar el tipo de gasto.';
        this.tipoDeGasto = null;
        this.cargando = false;
      }
    });
  }

  private getByIdBitacoraGastos(idBitacoraGastos:number): void{
    this.bitacoraGastosService.getById(idBitacoraGastos).subscribe({
      next: (data) => {
        this.idBitacoraGastos = data.idBitacoraGastos;
        this.isEditMode = true;
        this.patchValuesToForm(data);
      },
      error: (err) => {
        console.error('Error al obtener los datos.', err);
        this.error = 'No se pudo cargar el tipo de gasto.';
        this.tipoDeGasto = null;
        this.cargando = false;
      }
    });
  }

  /** Cargar datos si estamos editando */
  private patchValuesToForm(bitacoraGastos:BitacoraGastosRead): void {
    this.form.patchValue({
      idBitacoraGastos: bitacoraGastos.idBitacoraGastos,
      idTipoDeGasto: bitacoraGastos.idTipoDeGasto,
      descripcion: bitacoraGastos.descripcion,
      debitado: bitacoraGastos.debitado,
      acreditado: bitacoraGastos.acreditado,
      monto: bitacoraGastos.monto,
      mes: bitacoraGastos.mes,
      anio: bitacoraGastos.anio,
      observaciones: bitacoraGastos.observaciones
    });
    if(bitacoraGastos.debitado){
      this.form.patchValue({
        tipoMovimiento: 1
      });
    }
    if(bitacoraGastos.acreditado){
      this.form.patchValue({
        tipoMovimiento: 2
      });
    }
  }

  onlyNumbers(event: KeyboardEvent): void { 
    const input = event.target as HTMLInputElement; 
    const char = event.key; 

    //const nextValue = currentValue + char; 
    const start = input.selectionStart ?? input.value.length; const end = input.selectionEnd ?? input.value.length;
    const nextValue = input.value.substring(0, start) + char + input.value.substring(end);
    
    // Permitir teclas de control (Backspace, Tab, flechas, etc.) 
    if ( event.key === 'Backspace' || 
         event.key === 'Tab' || 
         event.key.startsWith('Arrow') || 
         event.key === 'Delete' ){ 
      return; 
    }

    // Validar con regex: número entero o decimal 
    // con máximo un punto y hasta 2 decimales 
    const regex = /^\d+$/;

    if (!regex.test(nextValue)){ 
      event.preventDefault();
    } 
  }

  onSubmit(): void {
    if (this.form.invalid) {
      console.log('invalid form')
      this.form.markAllAsTouched(); 
      return; 
    }else{
      this.saveForm();
    }
  }

  /** Guardar un nuevo animal */
  saveForm(): void {

    const raw = this.form.getRawValue();

    this.idTipoDeGasto = raw.idTipoDeGasto;

    const formData: any = {
      idTipoDeGasto: Number(raw.idTipoDeGasto),
      descripcion: raw.descripcion,
      monto: Number(raw.monto),
      mes: Number(raw.mes),
      anio: Number(raw.anio),
      observaciones: raw.observaciones
    };

    if(raw.tipoMovimiento == 1){
      formData.debitado = true;
      formData.acreditado = false;
    }
    
    if(raw.tipoMovimiento == 2){
      formData.acreditado = true;
      formData.debitado = false;
    }

    if (this.isEditMode && this.idBitacoraGastos) {
      formData.idBitacoraGastos = Number(raw.idBitacoraGastos);
      this.bitacoraGastosService.update(this.idBitacoraGastos, formData).subscribe({
        next: () => this.goBack(),
        error: (err) => console.error('Error al actualizar:', err)
      });
    } else {
      this.bitacoraGastosService.create(formData).subscribe({
        next: () => this.goBack(),
        error: (err) => console.error('Error al crear:', err)
      });
    }
  }

  goBack(): void {
    this.router.navigate([`/bitacora-gastos/list/tipo-de-gasto/${this.idTipoDeGasto}`]);
  }

}
