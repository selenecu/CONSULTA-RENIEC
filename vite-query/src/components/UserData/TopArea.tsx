import styled, { keyframes } from "styled-components";

// --- INTERFACES ---

export interface DniData {
  nombres: string;
  dni: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}

export interface RucData {
  numero_documento: string;
  razon_social: string;
  estado: string;
  condicion: string;
  direccion: string;
  departamento: string;
  provincia: string;
  distrito: string;
  ubigeo?: string; // Opcionales por si no vienen
  via_nombre?: string;
  zona_codigo?: string;
}

// Unimos los dos tipos en uno solo
interface ResultCardProps {
  data: DniData | RucData;
}

// --- COMPONENTE PRINCIPAL ---

export const TopArea = ({ data }: ResultCardProps) => {
  
  // Función para saber si es RUC (verificamos si tiene la propiedad 'razon_social')
  const isRuc = (item: any): item is RucData => {
    return 'razon_social' in item;
  };

  if (isRuc(data)) {
    // --- VISTA PARA RUC ---
    return (
      <CardContainer>
        <Grid>
          <DataGroup>
            <Label>RUC</Label>
            <Value isHighlight>{data.numero_documento}</Value>
          </DataGroup>
          <DataGroup>
            <Label>RAZÓN SOCIAL</Label>
            <Value>{data.razon_social}</Value>
          </DataGroup>
          <DataGroup>
            <Label>ESTADO</Label>
            <Value>{data.estado}</Value>
          </DataGroup>
          <DataGroup>
            <Label>CONDICIÓN</Label>
            <Value>{data.condicion}</Value>
          </DataGroup>
          
          {/* Información extra del RUC (ocupa todo el ancho en desktop) */}
          <FullWidthGroup>
            <Label>DIRECCIÓN FISCAL</Label>
            <Value style={{ fontSize: '1.6rem' }}>
              {data.direccion} 
            </Value>
            <SmallText>
              {data.departamento} - {data.provincia} - {data.distrito}
            </SmallText>
          </FullWidthGroup>
        </Grid>
      </CardContainer>
    );
  }

  // --- VISTA PARA DNI ---
  return (
    <CardContainer>
      <Grid>
        <DataGroup>
          <Label>DNI</Label>
          <Value isHighlight>{data.dni}</Value>
        </DataGroup>
        <DataGroup>
          <Label>NOMBRES</Label>
          <Value>{data.nombres}</Value>
        </DataGroup>
        <DataGroup>
          <Label>APELLIDO PATERNO</Label>
          <Value>{data.apellidoPaterno}</Value>
        </DataGroup>
        <DataGroup>
          <Label>APELLIDO MATERNO</Label>
          <Value>{data.apellidoMaterno}</Value>
        </DataGroup>
      </Grid>
    </CardContainer>
  );
};

// --- STYLED COMPONENTS & ANIMACIONES ---

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const CardContainer = styled.section`
  width: 100%;
  margin-top: 2.4rem;
  padding: 2.4rem;
  border-radius: 1.5rem;
  background: ${(props) => props.theme.colors.card};
  box-shadow: 0px 16px 30px -10px rgba(70, 96, 187, 0.2);
  animation: ${fadeIn} 0.5s ease-out forwards;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 4rem;
    row-gap: 2.5rem;
  }
`;

const DataGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

// Grupo que ocupa las 2 columnas en pantallas grandes (ideal para direcciones largas)
const FullWidthGroup = styled(DataGroup)`
  @media (min-width: 768px) {
    grid-column: span 2;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px dashed ${(props) => props.theme.colors.textNorm}40;
  }
`;

const Label = styled.span`
  font-size: 1.3rem;
  color: ${(props) => props.theme.colors.textNorm};
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-weight: 500;
`;

const Value = styled.strong<{ isHighlight?: boolean }>`
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
  color: ${(props) => 
    props.isHighlight ? "#0079ff" : props.theme.colors.textBolded};
  word-break: break-word;

  @media (min-width: 768px) {
    font-size: 2.4rem;
  }
`;

const SmallText = styled.span`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.textNorm};
  font-style: italic;
  margin-top: 0.2rem;
`;