import { color } from '@mui/system';
import styled from "styled-components";
import { bege, marromEscuro } from "../../utils/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  .burger {
    position: relative;
    width: 40px;
    height: 30px;
    background: transparent;
    cursor: pointer;
    display: block;
  }

  .burger input {
    display: none;
  }

  .burger span {
    display: block;
    position: absolute;
    height: 4px;
    width: 100%;
    background: white;
    border-radius: 9px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
  }

  .burger span:nth-of-type(1) {
    top: 0px;
    transform-origin: left center;
  }

  .burger span:nth-of-type(2) {
    top: 50%;
    transform: translateY(-50%);
    transform-origin: left center;
  }

  .burger span:nth-of-type(3) {
    top: 100%;
    transform-origin: left center;
    transform: translateY(-100%);
  }

  .burger input:checked ~ span:nth-of-type(1) {
    transform: rotate(45deg);
    top: 0px;
    left: 5px;
  }

  .burger input:checked ~ span:nth-of-type(2) {
    width: 0%;
    opacity: 0;
  }

  .burger input:checked ~ span:nth-of-type(3) {
    transform: rotate(-45deg);
    top: 28px;
    left: 5px;
  }

  .navbar-menulist {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 4rem;
    color: white;
    width: 100%;
  }

  .navbar-menulist li {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
  }

  .navbar-menulist li > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    cursor: pointer;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .navbar-menulist svg {
    transition: transform 0.3s ease-in-out;
  }

  .container-gerenciamentos,
  .container-cadastros,
  .container-administracao {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    color: ${bege};
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    margin-top: 0.5rem;
  }

  .container-gerenciamentos ul,
  .container-cadastros ul,
  .container-administracao ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    text-align: start;
    /* color: ${marromEscuro}; */
    font-weight: 600;
    width: 100%;
    font-size: 15px;
  }

  .container-gerenciamentos ul li,
  .container-cadastros ul li,
  .container-administracao ul li {
    cursor: pointer;
    padding: 0.25rem 0;
    width: 100%;
    text-align: start;
  }
`;
