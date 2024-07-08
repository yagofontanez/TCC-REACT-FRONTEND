import styled from "styled-components";
import { bege, cinza, marromEscuro } from "../../utils/colors";

interface ContainerProps {
  isMenuOpen: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: ${(props) => (props.isMenuOpen ? "13rem" : "6rem")};
  height: 100vh;
  background: ${marromEscuro};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 1rem 0.5rem;
  box-shadow: -1px -1px 32px -2px rgba(53,47,68,0.85);
  -webkit-box-shadow: -1px -1px 32px -2px rgba(53,47,68,0.85);
  -moz-box-shadow: -1px -1px 32px -2px rgba(53,47,68,0.85);

  svg {
    cursor: pointer;
    transition: 0.3s ease-in-out;
  }

  .menu-user {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.2rem;
  }

  li {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.1rem;
  }

  .container-user {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 14rem;
    padding: 1rem 2rem;
    z-index: 1;
    border-radius: 10px;
  }

  .container-user ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: white;
    font-weight: 600;
  }

  .container-user ul li {
    cursor: pointer;
  }

  .icons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }
`;
