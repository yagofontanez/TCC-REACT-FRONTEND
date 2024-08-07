import styled from "styled-components";
import { marromEscuro } from "../../utils/colors";

export const Container = styled.div`
#bottone1 {
 padding-left: 33px;
 padding-right: 33px;
 padding-bottom: 16px;
 padding-top: 16px;
 border-radius: 4px;
 background: ${marromEscuro};
 border: none;
 font-family: inherit;
 text-align: center;
 cursor: pointer;
 transition: 0.4s;
 color: white;
 height: 40px;
 display: flex;
 align-items: center;
 justify-content: center;
}

#bottone1:hover {
 box-shadow: 7px 5px 56px -14px ${marromEscuro};
}

#bottone1:active {
 transform: scale(0.97);
 box-shadow: 7px 5px 56px -10px ${marromEscuro};
}
`;