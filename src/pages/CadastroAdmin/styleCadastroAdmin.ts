import styled from 'styled-components';
import { grayHalley, redHalley, whiteHalley } from '../../utils/colors';
import background from '../../assets/backgroundLogin.png';

export const Container = styled.div`
  width: 100%;
  max-height: max-content;
  height: 100vh;
  background: url(${background});
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

export const ContainerLogin = styled.div`
  width: 40rem;
  height: 30rem;
  background: ${grayHalley};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 1.5rem;
`;
