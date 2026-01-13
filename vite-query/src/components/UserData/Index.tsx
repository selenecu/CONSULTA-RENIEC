// src/components/UserData/Index.tsx
import styled from "styled-components";
import { ResultCard } from "./ResultCard"; // <--- Importamos la tarjeta correcta
import { UserDataProps } from "../../types";

export const Index = ({ user }: UserDataProps) => {
  return (
    <Container>
      <SideArea>
        {/* Pasamos los datos a la tarjeta */}
        <ResultCard data={user} />
      </SideArea>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  padding: 3rem 2.4rem;
  background: ${(props) => props.theme.colors.card};
  border-radius: 1.5rem;
  margin-top: 1.6rem;
  max-width: 73.3rem;
  box-shadow: 0px 16px 30px -10px rgba(70, 96, 187, 0.2);
  display: flex;
  animation: fadeIn 0.5s ease-in-out;

  @media (min-width: 768px) { padding: 4.8rem; }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const SideArea = styled.div`
  width: 100%;
`;