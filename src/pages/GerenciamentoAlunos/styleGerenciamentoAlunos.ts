import styled from "styled-components";
import { bege, cinza, marromClaro, marromEscuro, rosaClaro, whiteHalley } from "../../utils/colors";
import background from '../../assets/backgroundPurple.jpg';

export const Container = styled.div` 
  width: 100%;
  height: 100vh;
  background: url(${background}) no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .div-geral-container {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    background: transparent;
    backdrop-filter: blur(10px);
    border-radius: 25px;
    box-shadow: -1px -1px 32px -2px rgba(53,47,68,0.85);
    -webkit-box-shadow: -1px -1px 32px -2px rgba(53,47,68,0.85);
    -moz-box-shadow: -1px -1px 32px -2px rgba(53,47,68,0.85);
  }

  .container-relatorio-total,
  .container-infos-relatorio {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    gap: 2rem;
  }

  .container-relatorio-total {
    flex-wrap: wrap;
    justify-content: center;
  }

  #container-total {
    height: 15rem;
    width: 20rem;
    border-radius: 1rem;
    padding: 1rem;
    color: ${whiteHalley};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin: 1rem; 
  }

  .faculdades-totais, .veiculos-totais, .motoristas-totais, .alunos-totais, .pontos-totais {
    background: ${cinza};
    box-shadow: -1px -1px 32px -2px rgba(53,47,68,0.85);
    -webkit-box-shadow: -1px -1px 32px -2px rgba(53,47,68,0.85);
    -moz-box-shadow: -1px -1px 32px -2px rgba(53,47,68,0.85);
  }

  #assunto {
    font-size: 20px;
    font-weight: 600;
  }

  #total {
    font-size: 96px;
    font-weight: 700;
  }

  .relatorio-alunos, .relatorio-faculdades, .relatorio-pontos {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .container-infos-relatorio {
    margin-left: 10px;
    align-items: flex-start;
    gap: 3rem;
  }

  .usuarios-line, .faculdades-line, .pontos-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 28rem;
  }

  .separator-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
`
