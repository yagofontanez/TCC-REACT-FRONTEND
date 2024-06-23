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

  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  
  .title-login {
    color: ${whiteHalley};
    font-weight: 500;
  }


button {
 padding: 10px 20px;
 border: unset;
 border-radius: 15px;
 color: #212121;
 z-index: 1;
 background: #e8e8e8;
 position: relative;
 font-weight: 1000;
 font-size: 17px;
 -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
 box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
 transition: all 250ms;
 overflow: hidden;
}

button::before {
 content: "";
 position: absolute;
 top: 0;
 left: 0;
 height: 100%;
 width: 0;
 border-radius: 15px;
 background-color: #D90804;
 z-index: -1;
 -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
 box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
 transition: all 250ms
}

button:hover {
 color: #e8e8e8;
}

button:hover::before {
 width: 100%;
}

.error {
    color: ${redHalley};
}
`;
