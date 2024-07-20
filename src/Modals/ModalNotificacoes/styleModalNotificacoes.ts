import { marromClaro, marromEscuro } from './../../utils/colors';
import styled from "styled-components";

export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); 
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999999999999;
`;

export const ModalContent = styled.div`
    background: white; 
    padding: 2.4rem;
    border-radius: 8px;
    width: 100%;
    max-width: 1400px;
    box-shadow: 0px 1px 39px -3px rgba(41,37,28,0.7);
    -webkit-box-shadow: 0px 1px 39px -3px rgba(41,37,28,0.7);
    -moz-box-shadow: 0px 1px 39px -3px rgba(41,37,28,0.7);
    text-align: center;

.faculdades-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.div-separator {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-height: 480px;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
}
`;
