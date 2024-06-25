import styled from "styled-components";
import { bege, cinza, marromEscuro } from "../../utils/colors";

export const Container = styled.div`
  .navbar-menulist {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    color: white;
  }

  .navbar-menulist li {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.1rem;
    position: relative; 
  }

  svg {
    cursor: pointer;
    transition: transform 0.3s ease-in-out; 
  }

  .container-gerenciamentos,
  .container-cadastros,
  .container-administracao {
    position: absolute;
    top: 100%;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: ${bege};
    width: 14rem;
    padding: 1rem 0.4rem;
    z-index: 1;
    border-radius: 10px;
  }

  .container-gerenciamentos ul,
  .container-cadastros ul,
  .container-administracao ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: ${marromEscuro};
    font-weight: 600;
  }

  .container-gerenciamentos ul li,
  .container-cadastros ul li,
  .container-administracao ul li {
    cursor: pointer;
  }
`;
