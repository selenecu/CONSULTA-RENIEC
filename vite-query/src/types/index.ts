export interface UserProps {
    nombres: string;
    dni: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
  }
  
  export interface TopAreaProps {
    setUser: (user: UserProps | null) => void;
  }
  
  export interface UserDataProps {
    user: UserProps;
  }