import styled from "styled-components"
import { ThemeContextProvider} from "./contexts/ThemeContext"
import {TopArea} from "./components/TopArea";
import { useState } from "react";
import { DniProps } from "./types";
import {Index}  from "./components/UserData/Index";

function App() {
  const [user, setDni] = useState<DniProps | null>(null)

  function setDniData (dni: DniProps | null): void {
    setDni(dni)
  }

  return (
    <ThemeContextProvider>
      <Container>
        <TopArea setDni={setDniData} />
        { user && <Index user={user} /> }
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

  @media (min-width: 768px) {
    padding: 3.1rem 7rem;
  }
`;

export default App