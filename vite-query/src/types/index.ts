export interface DniProps {
  nombres: string;
  dni: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}

export interface RucProps {
  numero_documento: string;
  razon_social: string;
  estado: string;
  condicion: string;
  direccion: string;
  departamento: string;
  provincia: string;
  distrito: string;
  ubigeo?: string;
  via_nombre?: string;
  via_tipo?: string;
  zona_codigo?: string;
  zona_tipo?: string;
  interior?: string;
  kilometro?: string;
  lote?: string;
  manzana?: string;
  numero?: string;
  dpto?: string;
}

// Unión de tipos
export type SearchResult = DniProps | RucProps;

// Props para componentes
export interface TopAreaProps {
  setResult: (data: SearchResult | null) => void;
}

export interface UserDataProps {
  user: SearchResult;
}