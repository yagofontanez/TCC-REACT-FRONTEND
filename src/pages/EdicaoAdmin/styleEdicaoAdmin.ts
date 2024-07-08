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
`

export const Content = styled.div`
width: 98vw;
max-width: max-content;
margin: 0 auto;

.title {
    color: ${whiteHalley};
}

.container-cadastro-faculdade {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background: transparent;
    backdrop-filter: blur(10px);
    border-radius: 25px;
    padding: 5rem;
    box-shadow: -1px -1px 32px -2px rgba(53,47,68,0.85);
    -webkit-box-shadow: -1px -1px 32px -2px rgba(53,47,68,0.85);
    -moz-box-shadow: -1px -1px 32px -2px rgba(53,47,68,0.85);
}

input {
    width: 40rem;
}
`;