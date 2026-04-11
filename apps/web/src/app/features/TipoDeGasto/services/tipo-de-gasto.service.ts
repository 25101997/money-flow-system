import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

import { TipoDeGastoRead, TipoDeGastoCreate } from '../models/tipo-de-gasto.model';

@Injectable({ providedIn: 'root' })
export class TipoDeGastoService {

  private apiUrl = `${environment.apiBaseUrl}/TipoDeGasto`;

  constructor(private http: HttpClient) {}

  // Obtener todos
  getAll(): Observable<TipoDeGastoRead[]> {
    return this.http.get<TipoDeGastoRead[]>(this.apiUrl);
  }

  // Obtener por Id
  // Crear
  // Actualizar

}
