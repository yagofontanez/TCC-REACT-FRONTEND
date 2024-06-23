import styled from "styled-components";
import { marromEscuro, redHalley } from "../../utils/colors";

export const Container = styled.div`
.input-container {
  width: auto;
  position: static;
  display: flex;
  flex-direction: column-reverse;
}

.input-container label {
  color: black;
  position: relative;
  top: 2px;
  border: solid white;
  border-top: none;
  border-right: none;
  border-left: none;
  width: fit-content;
  transition: transform 0.2s;
  margin: 0px 0px 0px 12px;
  padding: 0px 4px 0px 4px;
  font-size: 20px;
}

.input-container input:focus + label {
  color: #29251c;
  transform: scale(1.2);
  transform: translateX(0.5rem);
}

.input-container input {
  border: 2px #29251c solid;
  padding: 8px;
}

.input-container input:focus {
  outline: none;
}
`;