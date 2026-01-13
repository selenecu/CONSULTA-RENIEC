// src/App.tsx
import styled from "styled-components";
import { useState } from "react";
import { ThemeContextProvider } from "./contexts/ThemeContext";

// Importamos los tipos
import { SearchResult } from "./types";

// Importamos Componentes
import { TopArea } from "./components/TopArea"; // EL BUSCADOR
import { Index as UserDataCard } from "./components/UserData/Index"; // EL RESULTADO

function App() {
  // 1. Estado unificado (puede ser DNI o RUC)
  const [userData, setUserData] = useState<SearchResult | null>(null);

  return (
    <ThemeContextProvider>
      <Container>
        {/* 2. Pasamos el setter genérico al Buscador */}
        <TopArea setResult={setUserData} />
        
        {/* 3. Si hay datos, mostramos la tarjeta */}
        {userData && <UserDataCard user={userData} />}
        
      </Container>
    </ThemeContextProvider>
  );
}

const Container = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.background};
  padding: 3.1rem 2.4rem;
  transition: background 0.3s ease;

  @media (min-width: 768px) {
    padding: 3.1rem 7rem;
  }
`;

export default App;