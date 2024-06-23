import { color } from './../../../node_modules/@mui/system/index.d';
import styled from 'styled-components';
import { bege, grayHalley, marromEscuro, redHalley, whiteHalley } from '../../utils/colors';
import background from '../../assets/backgroundLogin.png';

export const Container = styled.div`
  width: 100%;
  max-height: max-content;
  height: 100vh;
  background: ${bege};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 5rem 5rem;
`;

export const ContainerLogin = styled.div`
  width: 30rem;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;

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
`;
