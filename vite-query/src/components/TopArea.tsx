import { useContext, useState, useRef } from "react";
import styled from "styled-components";
import { ThemeContext } from "../contexts/ThemeContext";
// CORRECCIÓN AQUÍ: Usamos los nombres correctos
import { TopAreaProps, DniProps, RucProps} from "../types";

export const TopArea = ({ setResult }: TopAreaProps) => {
  const { changeTheme, lightMode } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    if (inputRef.current) inputRef.current.value = "";
    setResult(null);
    setErrorMsg(null);
    inputRef.current?.focus();
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const value = inputRef.current?.value.trim();

    if (!value) {
      setErrorMsg("El campo no puede estar vacío");
      setResult(null);
      return;
    }
    if (value.length !== 8 && value.length !== 11) {
      setErrorMsg("Ingrese 8 dígitos (DNI) u 11 dígitos (RUC)");
      setResult(null);
      return;
    }

    setErrorMsg(null);
    setIsLoading(true);
    setResult(null);

    await fetchData(value);
  };

  const fetchData = async (number: string) => {
    const apiKey = 'sk_7854.bvQsqmgXw7K8NvYfBgNyxuNHNjR4ExMp';
    const isRuc = number.length === 11;
    
    // Recuerda configurar el proxy en vite.config.ts si usas /api-reniec
    const endpoint = isRuc 
      ? `/api-reniec/v1/sunat/ruc?numero=${number}`
      : `/api-reniec/v1/reniec/dni?numero=${number}`;

    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        if (response.status === 404) throw new Error("Documento no encontrado");
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();
      console.log("Respuesta API:", data);

      const result = data.result || data;

      if (result) {
        if (isRuc) {
          // CORRECCIÓN: Usamos RucProps
          const rucUser: RucProps = {
            numero_documento: result.ruc || result.numeroDocumento || number,
            razon_social: result.razon_social || result.nombre || "SIN NOMBRE",
            condicion: result.condicion || "-",
            estado: result.estado || "-",
            direccion: result.direccion || "-",
            departamento: result.departamento || "-",
            provincia: result.provincia || "-",
            distrito: result.distrito || "-",
            ubigeo: result.ubigeo,
          };
          setResult(rucUser);
        } else {
          // CORRECCIÓN: Usamos DniProps
          const dniUser: DniProps = {
            dni: result.dni || result.numeroDocumento || number,
            nombres: result.nombres || result.first_name,
            apellidoPaterno: result.apellidoPaterno || result.first_last_name,
            apellidoMaterno: result.apellidoMaterno || result.second_last_name,
          };
          setResult(dniUser);
        }
      } else {
        setErrorMsg("No se encontró información.");
      }

    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || "Error de conexión");
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <ThemeArea>
        <Title>CONSULTA PERÚ</Title>
        <ChangeThemeBtn type="button" onClick={changeTheme}>
          <span>{lightMode ? "DARK" : "LIGHT"}</span>
          <img 
            src={lightMode ? "/assets/icon-moon.svg" : "/assets/icon-sun.svg"} 
            alt="theme icon" 
          />
        </ChangeThemeBtn>
      </ThemeArea>

      <InputArea onSubmit={handleSubmit}>
        <InputLabel htmlFor="documento">
          <img src="/assets/icon-search.svg" alt="buscar" />
        </InputLabel>

        <Input
          ref={inputRef}
          id="documento"
          name="documento"
          type="text"
          inputMode="numeric"
          placeholder="DNI (8) o RUC (11)..."
          maxLength={11}
          disabled={isLoading}
          autoComplete="off"
        />
        
        <ClearBtn type="button" onClick={handleClear} disabled={isLoading}>
          Limpiar
        </ClearBtn>
        
        <SubmitBtn type="submit" disabled={isLoading}>
          {isLoading ? "..." : "Buscar"}
        </SubmitBtn>
      </InputArea>

      <MessageContainer>
        {errorMsg && <ErrorMessage>⚠️ {errorMsg}</ErrorMessage>}
      </MessageContainer>
    </Container>
  );
};

// --- STYLED COMPONENTS ---
const Container = styled.header` width: 100%; max-width: 73.3rem; `;
const ThemeArea = styled.div` display: flex; align-items: center; justify-content: space-between; `;
const Title = styled.h1` font-weight: 800; font-size: 2.6rem; line-height: 3rem; color: ${(props) => props.theme.colors.textBolded}; margin: 0; `;
const ChangeThemeBtn = styled.button` display: flex; align-items: center; gap: 1.6rem; border: none; background: none; font-weight: 700; font-size: 1.3rem; letter-spacing: 0.25rem; color: ${(props) => props.theme.colors.themeBtn}; cursor: pointer; &:hover { opacity: 0.7; } `;
const InputArea = styled.form` margin-top: 3.6rem; border-radius: 1.5rem; background: ${(props) => props.theme.colors.card}; box-shadow: 0px 16px 30px -10px rgba(70, 96, 187, 0.2); width: 100%; height: 6rem; display: flex; align-items: center; padding: 0.8rem; gap: 0.5rem; @media (min-width: 768px) { height: 6.9rem; padding: 1rem; } `;
const InputLabel = styled.label` padding: 0 0 0 1rem; cursor: pointer; img { width: 2.4rem; height: 2.4rem; } `;
const Input = styled.input` flex: 1; font-size: 1.6rem; color: ${(props) => props.theme.colors.textNorm}; background: none; border: none; margin: 0 1rem; min-width: 0; &:focus { outline: none; } `;
const SubmitBtn = styled.button` background: #0079ff; border: none; border-radius: 1rem; height: 100%; padding: 0 2.4rem; font-size: 1.6rem; font-weight: 700; color: #fff; cursor: pointer; transition: all 0.3s ease; &:hover:not(:disabled) { background: #60abff; } &:disabled { background: #4b6a9b; opacity: 0.7; } @media (max-width: 500px) { padding: 0 1.5rem; font-size: 1.4rem; } `;
const ClearBtn = styled.button` background: transparent; border: none; border-radius: 1rem; height: 80%; padding: 0 1.5rem; font-size: 1.4rem; font-weight: 600; color: ${(props) => props.theme.colors.textNorm}; cursor: pointer; opacity: 0.7; &:hover:not(:disabled) { opacity: 1; background: rgba(0,0,0,0.05); } @media (max-width: 500px) { display: none; } `;
const MessageContainer = styled.div` margin-top: 2rem; min-height: 2.4rem; `;
const ErrorMessage = styled.p` font-weight: 700; font-size: 1.5rem; color: #f74646; `;