import styled from "styled-components";
import { bege, cinza, marromEscuro } from "../../utils/colors";

export const Container = styled.div`
width: 100%;
height: 5rem;
background: ${marromEscuro};
display: flex;
align-items: center;
justify-content: space-between;
padding: 1rem 0.5rem;

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
    align-items: center;
    justify-content: center;
    gap: 0.1rem;
    position: relative; 
}

.container-user {
    position: absolute;
    top: 100%;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: ${bege};
    width: 14rem;
    padding: 1rem 0.4rem;
    z-index: 1;
    border-radius: 10px;
  }

  .container-user ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: ${marromEscuro};
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
`