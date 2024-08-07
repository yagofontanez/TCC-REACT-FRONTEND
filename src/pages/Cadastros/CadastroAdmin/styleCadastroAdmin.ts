import { color } from "@mui/system";
import styled from "styled-components";
import {
  bege,
  grayHalley,
  marromEscuro,
  redHalley,
  whiteHalley,
} from "../../../utils/colors";
import background from "../../../assets/backgroundPurple.jpg";

export const Container = styled.div`
  width: 100%;
  max-height: max-content;
  height: 100vh;
  background: url(${background}) no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 5rem 5rem;
`;

export const ContainerLogin = styled.div`
  /* width: 30rem; */
  /* height: 10rem; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  background: transparent;
  backdrop-filter: blur(10px);
  border-radius: 25px;
  padding: 5rem;
  box-shadow: -1px -1px 32px -2px rgba(53, 47, 68, 0.85);
  -webkit-box-shadow: -1px -1px 32px -2px rgba(53, 47, 68, 0.85);
  -moz-box-shadow: -1px -1px 32px -2px rgba(53, 47, 68, 0.85);

  .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .title-login {
    color: ${marromEscuro};
    font-weight: 500;
  }

  .error {
    color: ${redHalley};
  }

  label {
    color: ${marromEscuro};
  }

  .form-login {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  input {
    width: 25rem;
  }
`;
