import { marromClaro, marromEscuro } from './../../utils/colors';
// ModalFaculdades/styleModalFaculdades.ts

import styled from "styled-components";
import { cinza } from "../../utils/colors";

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
`;

export const ModalContent = styled.div`
    background: white; 
    padding: 2rem;
    border-radius: 8px;
    width: 100%;
    max-width: 1200px;
    box-shadow: 0px 1px 39px -3px rgba(41,37,28,0.7);
    -webkit-box-shadow: 0px 1px 39px -3px rgba(41,37,28,0.7);
    -moz-box-shadow: 0px 1px 39px -3px rgba(41,37,28,0.7);
    text-align: center;

.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.container {
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 1rem;
  user-select: none;
}

.checkmark {
  --clr: ${marromEscuro};
  position: relative;
  top: 0;
  left: 0;
  height: 1.3em;
  width: 1.3em;
  background-color: #ccc;
  border-radius: 50%;
  transition: 300ms;
}

.container input:checked ~ .checkmark {
  background-color: var(--clr);
  border-radius: .5rem;
  animation: pulse 500ms ease-in-out;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.container input:checked ~ .checkmark:after {
  display: block;
}

.container .checkmark:after {
  left: 0.45em;
  top: 0.25em;
  width: 0.25em;
  height: 0.5em;
  border: solid #E0E0E2;
  border-width: 0 0.15em 0.15em 0;
  transform: rotate(45deg);
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 ${marromClaro};
    rotate: 20deg;
  }

  50% {
    rotate: -20deg;
  }

  75% {
    box-shadow: 0 0 0 10px ${marromClaro};
  }

  100% {
    box-shadow: 0 0 0 13px ${marromClaro};
    rotate: 0;
  }
}

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
