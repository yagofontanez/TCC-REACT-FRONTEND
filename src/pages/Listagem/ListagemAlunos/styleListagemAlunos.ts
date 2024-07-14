import styled from "styled-components";
import { bege, cinza, marromClaro, marromEscuro, whiteHalley } from "../../../utils/colors";
import background from '../../../assets/backgroundPurple.jpg';

export const Container = styled.div` 
    width: 100%;
    height: 100vh;
    background: url(${background}) no-repeat;
    background-position: center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
`;

export const Content = styled.div`
    width: 90vw;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.36);
    backdrop-filter: blur(10px);
    padding: 1rem;
    border-radius: 25px;
    box-shadow: -1px -1px 32px -2px rgba(53,47,68,0.85);
    -webkit-box-shadow: -1px -1px 32px -2px rgba(53,47,68,0.85);
    -moz-box-shadow: -1px -1px 32px -2px rgba(53,47,68,0.85);

    .title {
        color: ${whiteHalley};
        margin: 1rem 0;
    }

    .container-listagem {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 50px;
        gap: 0;
        overflow: hidden;
        margin-bottom: 2rem;
    }

    .icon-trash, .icon-edit {
        font-size: 18px; 
        cursor: pointer;
        transition: 0.4s ease;
    }

    .icon-trash:hover {
        color: #730200;
    }

    .icon-edit:hover {
        color: #17140e;
    }

    .cabecalho, .corpo-listagem {
        display: contents;
    }

    .cabecalho p, .corpo-listagem p {
        padding: 0.2rem; 
        border-bottom: 1px solid ${whiteHalley};
        text-align: center;
        font-size: 0.8rem;
    }

    .cabecalho p {
        font-weight: bold;
        color: ${whiteHalley};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
    }

    .corpo-listagem p {
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${whiteHalley};
    }

    .btn-excluir {
        background: ${bege}; 
        color: ${marromEscuro};
        border: none;
        padding: 0.2rem;
        text-align: center;
        cursor: pointer;
        transition: background 0.3s ease;
    }

    .btn-excluir:hover {
        background: ${marromClaro};
    }

    .cabecalho p:first-child, .corpo-listagem p:first-child {
        border-left: none;
    }

    .cabecalho p:last-child, .corpo-listagem p:last-child {
        border-right: none;
    }

    .actions {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.2rem;
    }

    .add-aluno {
        background: ${cinza};
        border-radius: 15px;
        padding: 1px 8px;
        cursor: pointer;
        margin-left: 10px;
    }
`;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

export const Modal = styled.div`
    position: absolute;
    background: white;
    padding: 1rem;
    border-radius: 10px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 120px;

    .modal-content {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .modal-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
    }

    svg {
        font-size: 18px;
    }

    .modal-content > svg {
        margin-left: -50px;
    }
`;
