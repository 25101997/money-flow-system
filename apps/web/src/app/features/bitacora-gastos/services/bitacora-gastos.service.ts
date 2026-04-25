import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

import { BitacoraGastosRead, BitacoraGastosCreate, 
         BitacoraGastosUpdate, BitacoraGastosIdResponse } from '../models/bitacora-gastos.model';

@Injectable({ providedIn: 'root' })
export class BitacoraGastosService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.production
      ? '/api/BitacoraGastos'
      : `http://${environment.ip}:${environment.port}/api/BitacoraGastos`;
  }

  getAll(): Observable<BitacoraGastosRead[]> {
    return this.http.get<BitacoraGastosRead[]>(this.apiUrl);
  }

  getById(id: number): Observable<BitacoraGastosRead> {
    return this.http.get<BitacoraGastosRead>(`${this.apiUrl}/${id}`);
  }

  create(payload: BitacoraGastosCreate): Observable<BitacoraGastosIdResponse> {
    return this.http.post<BitacoraGastosIdResponse>(this.apiUrl, payload);
  }

  update(id: number, payload: BitacoraGastosUpdate): Observable<BitacoraGastosIdResponse> {
    return this.http.put<BitacoraGastosIdResponse>(`${this.apiUrl}/${id}`, payload);
  }

  getByTipoDeGasto(idTipoDeGasto: number): Observable<BitacoraGastosRead[]> {
    return this.http.get<BitacoraGastosRead[]>(`${this.apiUrl}/tipo-de-gasto/${idTipoDeGasto}`);
  }

  delete(id: number): Observable<BitacoraGastosIdResponse> {
    return this.http.delete<BitacoraGastosIdResponse>(`${this.apiUrl}/${id}`);
  }

}

