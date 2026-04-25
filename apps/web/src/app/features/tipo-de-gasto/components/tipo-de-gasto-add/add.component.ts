import { Component } from '@angular/core';
import { TipoDeGastoService } from '../../services/tipo-de-gasto.service';

import { ActivatedRoute, Router } from '@angular/router';

// form imports
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'; 

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  constructor(
    private tipoDeGastoService: TipoDeGastoService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  isEditMode = false;
  id: number | null = null;
  form!: FormGroup;

  // Inicio de programa
  ngOnInit(){
    this.initFrom();
    this.readIdFromUrl();
  }

  private initFrom(): void {
    this.form = this.formBuilder.group({
      idTipoDeGasto: [null],
      nombre: [null, Validators.required],
      descripcion: [null, Validators.required],
      montoMaximo: [null, [
        Validators.required,
        Validators.min(1),
        Validators.max(99999),
      ]],
    });
  }

  private readIdFromUrl(): void {
    const idURL = this.route.snapshot.paramMap.get('id');
    if (idURL) {
      this.id = Number(idURL);
      this.isEditMode = true;
      this.loadDataToForm();
    }
  }

  /** Cargar datos si estamos editando */
  private loadDataToForm(): void {
    if (!this.id) return;

    this.tipoDeGastoService.getAll().subscribe({
      next: (data) => {
        const registro = data.find((item: any) => item.idTipoDeGasto === this.id);
        if (registro) {
          this.form.patchValue({
            idTipoDeGasto: registro.idTipoDeGasto,
            nombre: registro.nombre,
            descripcion: registro.descripcion,
            montoMaximo: registro.montoMaximo
          });
        }
      },
      error: () => {
        console.error('No se pudo cargar datos en el form.');
      }
    });

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

    const formData: any = {
      nombre: raw.nombre,
      descripcion: raw.descripcion,
      montoMaximo: raw.montoMaximo
    };

    if (this.isEditMode && this.id) {

      formData.idTipoDeGasto = raw.idTipoDeGasto;
      
      this.tipoDeGastoService.update(this.id, formData).subscribe({
        next: () => this.goBack(),
        error: (err) => console.error('Error al actualizar:', err)
      });

    } else {

      this.tipoDeGastoService.create(formData).subscribe({
        next: () => this.goBack(),
        error: (err) => console.error('Error al crear:', err)
      });

    }
  }

  goBack(): void {
    this.router.navigate(['/tipo-de-gasto/list']);
  }

}
