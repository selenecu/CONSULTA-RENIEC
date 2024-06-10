import { useContext, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { ThemeContext } from "../contexts/ThemeContext";
import { TopAreaProps, DniProps } from "../types";

export const TopArea = ({ setDni }: TopAreaProps) => {
  const { changeTheme, lightMode } = useContext(ThemeContext);
  const [empty, setEmpty] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const [inputUser] = useState("octocat");

  function hadleSubmit() {
    if (
      usernameRef.current?.value.trim() === "" ||
      usernameRef.current?.value === undefined
    ) {
      setEmpty(true);
      setDni(null);
      return;
    }

    setEmpty(false);
    fetchUser(usernameRef.current.value);
  }

  async function fetchUser(dni: string) {
    const apiKey = 'c52e5b9f5dmshd06f0e1ff5a802ep1bb4f8jsn329094d00cfa';
    const apiHost = 'peruvian-dni-info.p.rapidapi.com';

    const response = await fetch(`https://peruvian-dni-info.p.rapidapi.com/dni/${dni}`, {
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': apiHost,
        }
    });

    const data = await response.json();

    if (response.status != 200) {
        setNotFound(true);
        setDni(null);
        return;
    }

    setNotFound(false);

    const user: DniProps = {
        nombres: data.result.nombres,
        dni: data.result.dni,
        apellidoPaterno: data.result.apellidoPaterno,
        apellidoMaterno: data.result.apellidoMaterno,
    };
    console.log(data, user);

    setDni(user);
}

useEffect(() => {
  fetchUser(inputUser);
}, [inputUser]);
  return (
    <Container>
      <ThemeArea>
        <Tittle>
          CONSULTA      
        </Tittle>
        <ChangeThemeBtn type="button" onClick={changeTheme}>
          {lightMode ? (
            <>
              DARK
              <img src="/assets/icon-moon.svg" alt="dark mode" />
            </>
          ) : (
            <>
              LIGHT
              <img src="/assets/icon-sun.svg" alt="light mode" />
            </>
          )}
        </ChangeThemeBtn>
      </ThemeArea>

      <InputArea
        onSubmit={(e) => {
          e.preventDefault();
          hadleSubmit();
        }}
      >
        <InputLabel>
          <img src="/assets/icon-search.svg"  alt="search .."/>
        </InputLabel>

        <Input
          ref={usernameRef}
          name="username"
          id="username"
          type="text"
          placeholder="Consultar DNI ..."
        />
        {empty && <Warn>El campo no puede estar vacío</Warn>}
        {notFound && <Warn>No hay resultados</Warn>}

        <SubmitBtn type="submit">Consultar</SubmitBtn>
      </InputArea>
    </Container>
  );
};
const Tittle = styled.strong`
  font-weight: bold;
  font-size: 2rem;
  line-height: 2.4rem;
  color: ${(props) => props.theme.colors.textBolded};

  @media (min-width: 768px) {
    font-size: 2.7rem;
  }
`;
const Container = styled.header`
  width: 100%;
  max-width: 73.3rem;
`;

const ThemeArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;


const Warn = styled.small`
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 2.2rem;
    color: #f74646;
    margin-right: 2.4rem;
`

const ChangeThemeBtn = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: none;
  font-weight: bold;
  font-size: 1.6rem;
  line-height: 1.9rem;
  letter-spacing: 0.25rem;
  color: ${(props) => props.theme.colors.themeBtn};
  cursor: pointer;

  img {
    margin-left: 1.6rem;
  }
`;

const InputArea = styled.form`
  margin-top: 3.6rem;
  border-radius: 1.5rem;
  background: ${(props) => props.theme.colors.card};
  box-shadow: 0px 16px 30px -10px rgba(70, 96, 187, 0.198567);
  width: 100%;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 0.7rem 0.7rem 1.6rem;
  transition: height 0.3s ease;
  position: relative;

  @media (min-width: 768px) {
    height: 6.9rem;
  }
`;

const InputLabel = styled.label`
  height: 2.4rem;
  cursor: pointer;
`;

const Input = styled.input`
  flex: 1;
  font-style: normal;
  font-weight: normal;
  font-size: 1.4rem;
  line-height: 192%;
  color: ${(props) => props.theme.colors.textNorm};
  background: none;
  border: none;
  margin: 0 0.8rem;

  @media (min-width: 768px) {
    font-size: 1.7rem;
    margin: 0 2.4rem;
  }

  &:focus {
    outline: 1px dashed #0079ff;
  }
`;

const SubmitBtn = styled.button`
  background: #0079ff;
  border: none;
  height: 100%;
  border-radius: 1rem;
  line-height: 2.1rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  width: 8.4rem;
  transition: all 0.3s ease-out;

  &:hover {
    filter: brightness(1.05);
    box-shadow: 0px 0px 15px -3px #0079ff;
  }

  @media (max-width: 768px) and (min-width: 650px) {
    width: 10.5rem;
    font-size: 1.6rem;
  }

   @media (max-width: 650px) and (min-width: 400px) {
    width: 10.4rem;
    font-size: 1.3rem;
  }
`;