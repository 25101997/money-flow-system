export interface TipoDeGastoCreate {
  idTipoDeGasto: number;
  nombre: string;
  descripcion: string;
  montoMaximo: number;
}

export interface TipoDeGastoRead {
  idTipoDeGasto: number;
  nombre: string;
  descripcion: string;
  montoMaximo: number;
}

export interface TipoDeGastoUpdate {
  idTipoDeGasto: number;
  nombre: string;
  descripcion: string;
  montoMaximo: number;
}
