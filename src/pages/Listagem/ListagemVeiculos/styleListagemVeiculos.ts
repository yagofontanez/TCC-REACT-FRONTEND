import styled from "styled-components";
import { bege, marromClaro, marromEscuro } from "../../../utils/colors";

export const Container = styled.div` 
    width: 100%;
    height: 100vh;
    background: ${marromClaro};
`;

export const Content = styled.div`
    width: 90vw;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .title {
        color: ${marromEscuro};
        margin: 1rem 0;
    }

    .container-listagem {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 50px;
        gap: 0;
        border: 1px solid ${marromEscuro};
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
        border: 1px solid ${marromEscuro};
        text-align: center;
        font-size: 0.8rem;
    }

    .cabecalho p {
        font-weight: bold;
        color: ${marromEscuro};
        background: ${bege};
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .corpo-listagem p {
        background: ${bege};
        display: flex;
        align-items: center;
        justify-content: center;
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
`;
