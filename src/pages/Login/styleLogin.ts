import { color } from './../../../node_modules/@mui/system/index.d';
import styled from 'styled-components';
import { bege, grayHalley, marromEscuro, redHalley, whiteHalley } from '../../utils/colors';
import background from '../../assets/backgroundPurple.jpg';

export const Container = styled.div`
  width: 100%;
  max-height: max-content;
  height: 100vh;
  background: url(${background}) no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 5rem 5rem;
`;

export const ContainerLogin = styled.div`
  background: transparent;
  backdrop-filter: blur(10px);
  width: 66rem;
  height: 33rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: -1px -1px 32px -2px rgba(53,47,68,0.85);
  -webkit-box-shadow: -1px -1px 32px -2px rgba(53,47,68,0.85);
  -moz-box-shadow: -1px -1px 32px -2px rgba(53,47,68,0.85);
  border-radius: 45px;

  .container-bgd-separator {
    background-color: ${marromEscuro};
    width: 50%;
    height: 100%;
    border-radius: 45px;
  }

  .cjota {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding-right: 3.5rem;
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  
  .title-login {
    color: ${whiteHalley};
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
