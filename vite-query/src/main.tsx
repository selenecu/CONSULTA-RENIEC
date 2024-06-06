import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import axios, { AxiosRequestConfig } from 'axios'
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
    overflow-x: hidden;
  }

  body, 
  input, 
  button, 
  textarea, 
  select {
    font-family: 'Space Mono', sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

`;
declare global {
  interface Window {
    axios: typeof import('axios');
  }

  interface AxiosStatic {
    headers: AxiosRequestConfig['headers'];
  }
}
axios.defaults.baseURL = 'https://peruvian-dni-info.p.rapidapi.com'
axios.defaults.headers['x-rapidapi-key'] = 'c52e5b9f5dmshd06f0e1ff5a802ep1bb4f8jsn329094d00cfa'
axios.defaults.headers['x-rapidapi-host'] = 'peruvian-dni-info.p.rapidapi.com'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
)
