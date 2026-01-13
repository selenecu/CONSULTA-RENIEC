// src/types.ts

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
  // ... otros campos opcionales
}

// ⚠️ ESTO ES CLAVE: Un tipo que puede ser DNI o RUC
export type SearchResult = DniProps | RucProps;

// Props para el Buscador (TopArea)
export interface TopAreaProps {
  setResult: (data: SearchResult | null) => void;
}

// Props para la Tarjeta de Resultado (UserData/Index)
export interface UserDataProps {
  user: SearchResult; // Acepta cualquiera de los dos
}