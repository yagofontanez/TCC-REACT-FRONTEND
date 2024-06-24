import styled from "styled-components";
import { bege, cinza, marromClaro, marromEscuro, rosaClaro, whiteHalley } from "../../utils/colors";

export const Container = styled.div` 
width: 100%;
height: 100vh;
background: ${marromClaro};

.container-relatorio-total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    gap: 2rem;
}

#container-total {
    height: 15rem;
    width: 40rem;
    border-radius: 1rem;
    padding: 1rem;
    color: ${whiteHalley};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}

.alunos-totais, .pontos-totais {
    background: ${marromEscuro};
}

.faculdades-totais {
    background: ${cinza};
}

#assunto {
    font-size: 24px;
    font-weight: 600;
}

#total {
    font-size: 96px;
    font-weight: 700;
}

.dark {
    color: ${marromEscuro};
}
`