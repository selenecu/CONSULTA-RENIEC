import styled from "styled-components";

interface TopAreaProps {
  nombres: string;
  dni: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}

export const TopArea = ({
  nombres,
  dni,
  apellidoPaterno,
  apellidoMaterno,
}: TopAreaProps) => {
  return (
    <>
      <Info>
    <SideInfo>
    <Nombres><p style={{ fontWeight: "normal" }}>NOMBRES:</p>{nombres}</Nombres>
    <ApellidoPaterno><p style={{ fontWeight: "normal" }}>APELLIDO PATERNO:</p>{apellidoPaterno}</ApellidoPaterno>
    <ApellidoMaterno><p style={{ fontWeight: "normal" }}>APELLIDO MATERNO:</p>{apellidoMaterno}</ApellidoMaterno>

    <Dni><p style={{ fontWeight: "normal" }}>DNI:</p>{dni}</Dni>
    </SideInfo>
      </Info>
    </>
  );
};

const Info = styled.div`
  display: flex;
  align-items: center;
`;

const Dni = styled.span`
  color: ${(props) => props.theme.colors.textNorm};
  font-size: 1.4rem;
  line-height: 192%;
  margin: 3.3rem 0 2.3rem;

  @media (min-width: 768px) {
    margin: 2.2rem 0 3.3rem;
    font-size: 1.6rem;
  }
`;

const ApellidoMaterno = styled.strong`
  font-weight: bold;
  font-size: 1.7rem;
  line-height: 2.4rem;
  color: ${(props) => props.theme.colors.textBolded};

  @media (min-width: 768px) {
    font-size: 2.7rem;
  }
`;

const SideInfo = styled.div`
  display: grid;

  @media (min-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    width: 100%;

    span:last-of-type {
      grid-column: 2 /3;
      grid-row: 1 /2;
      justify-self: end;
    }
  }
`;

const Nombres = styled.strong`
  font-weight: bold;
  font-size: 1.7rem;
  line-height: 2.4rem;
  color: ${(props) => props.theme.colors.textBolded};

  @media (min-width: 768px) {
    font-size: 2.7rem;
  }
`;

const ApellidoPaterno = styled.strong`
  font-weight: bold;
  font-size: 1.7rem;
  line-height: 2.4rem;
  color: ${(props) => props.theme.colors.textBolded};

  @media (min-width: 768px) {
    font-size: 2.7rem;
  }
`;
