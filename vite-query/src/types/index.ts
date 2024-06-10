export interface DniProps {
    nombres: string;
    dni: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
  }
  
  export interface TopAreaProps {
    setDni: (user: DniProps | null) => void;
  }
  
  export interface UserDataProps {
    user: DniProps;
  }