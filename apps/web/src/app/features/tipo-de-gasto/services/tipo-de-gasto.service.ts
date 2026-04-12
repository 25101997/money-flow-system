import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

import { TipoDeGastoRead, TipoDeGastoCreate } from '../models/tipo-de-gasto.model';

@Injectable({ providedIn: 'root' })
export class TipoDeGastoService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.production
      ? '/api/TipoDeGasto'
      : `http://${environment.ip}:${environment.port}/api/TipoDeGasto`;
  }

  // Obtener todos
  getAll(): Observable<TipoDeGastoRead[]> {
    return this.http.get<TipoDeGastoRead[]>(this.apiUrl);
  }

  // Crear
  create(tipoDeGasto: TipoDeGastoCreate): Observable<TipoDeGastoRead> {
    return this.http.post<TipoDeGastoRead>(this.apiUrl, tipoDeGasto);
  }

  // Actualizar
  update(id: number, tipoDeGasto: TipoDeGastoCreate): Observable<TipoDeGastoRead> {
    return this.http.put<TipoDeGastoRead>(`${this.apiUrl}/${id}`, tipoDeGasto);
  }

}

