export interface BitacoraGastosRead {
  idBitacoraGastos: number;
  idTipoDeGasto: number;
  tipoDeGasto: string;
  descripcion: string | null;
  debitado: boolean;
  acreditado: boolean;
  monto: number;
  mes: number;
  anio: number;
  insertado: string;
  actualizado: string | null;
  observaciones: string | null;
}

export interface BitacoraGastosCreate {
  idTipoDeGasto: number;
  descripcion: string | null;
  debitado: boolean;
  acreditado: boolean;
  monto: number;
  mes: number;
  anio: number;
  observaciones: string | null;
}

export interface BitacoraGastosUpdate {
  idBitacoraGastos: number;
  idTipoDeGasto: number;
  descripcion: string | null;
  debitado: boolean;
  acreditado: boolean;
  monto: number;
  mes: number;
  anio: number;
  observaciones: string | null;
}

export interface BitacoraGastosIdResponse {
  id: number;
  mensaje: string;
}

export interface ApiMessageResponse {
  message: string;
}