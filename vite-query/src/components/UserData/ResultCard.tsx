// src/components/UserData/ResultCard.tsx
import styled, { keyframes } from "styled-components";
import { SearchResult, RucProps } from "../../types";

export const ResultCard = ({ data }: { data: SearchResult }) => {
  
  // Función para detectar si es RUC
  const isRuc = (item: any): item is RucProps => {
    return 'razon_social' in item;
  };

  if (isRuc(data)) {
    // VISTA RUC
    return (
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
        <FullWidthGroup>
          <Label>DIRECCIÓN</Label>
          <Value style={{ fontSize: "1.6rem" }}>{data.direccion}</Value>
          <SmallText>{data.departamento} - {data.provincia} - {data.distrito}</SmallText>
        </FullWidthGroup>
      </Grid>
    );
  }

  // VISTA DNI
  return (
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
  );
};

// --- STYLED COMPONENTS (Copia los mismos que definimos antes: Grid, DataGroup, Label, Value...) ---
const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  gap: 2rem;
  @media (min-width: 768px) { grid-template-columns: repeat(2, 1fr); column-gap: 4rem; }
`;
const DataGroup = styled.div` display: flex; flex-direction: column; gap: 0.5rem; `;
const FullWidthGroup = styled(DataGroup)` @media (min-width: 768px) { grid-column: span 2; } `;
const Label = styled.span` font-size: 1.3rem; opacity: 0.7; font-weight: 500; color: ${props => props.theme.colors.textNorm}; `;
const Value = styled.strong<{ isHighlight?: boolean }>` font-size: 2rem; color: ${props => props.isHighlight ? "#0079ff" : props.theme.colors.textBolded}; word-break: break-word; `;
const SmallText = styled.span` font-size: 1.4rem; font-style: italic; color: ${props => props.theme.colors.textNorm}; `;