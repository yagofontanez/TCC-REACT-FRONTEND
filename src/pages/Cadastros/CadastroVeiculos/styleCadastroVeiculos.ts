import styled from "styled-components";
import { bege, cinza, marromClaro, marromEscuro, rosaClaro, whiteHalley } from "../../../utils/colors";

export const Container = styled.div` 
width: 100%;
height: 100vh;
background: ${marromClaro};
`

export const Content = styled.div`
width: 98vw;
max-width: max-content;
margin: 0 auto;

.title {
    color: ${marromEscuro};
}

.container-cadastro-faculdade {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

input {
    width: 40rem;
}

.select {
    cursor: pointer;
    background: ${bege} !important;
}

.buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 3rem;
}
`;