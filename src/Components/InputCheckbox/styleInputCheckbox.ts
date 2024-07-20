import styled from "styled-components";

export const Container = styled.div`


.container input {
 position: absolute;
 opacity: 0;
 cursor: pointer;
 height: 0;
 width: 0;
 border-radius: 5px;
}

.container {
 display: block;
 position: relative;
 cursor: pointer;
 font-size: 20px;
 user-select: none;
 border-radius: 5px;
 box-shadow: 2px 2px 0px rgb(183, 183, 183);
}

.checkmark {
 position: relative;
 top: 0;
 left: 0;
 height: 1.3em;
 width: 1.3em;
 background-color: #ccc;
 border-radius: 5px;
}

.container input:checked ~ .checkmark {
 box-shadow: 3px 3px 0px rgb(183, 183, 183);
 transition: all 0.2s;
 opacity: 1;
 background-image: linear-gradient(45deg, rgb(100, 61, 219) 0%, rgb(217, 21, 239) 100%);
}

.container input ~ .checkmark {
 transition: all 0.2s;
 opacity: 1;
 box-shadow: 1px 1px 0px rgb(183, 183, 183);
}

.checkmark:after {
 content: "";
 position: absolute;
 opacity: 0;
 transition: all 0.2s;
}

.container input:checked ~ .checkmark:after {
 opacity: 1;
 transition: all 0.2s;
}

.container .checkmark:after {
 left: 0.45em;
 top: 0.25em;
 width: 0.25em;
 height: 0.5em;
 border: solid white;
 border-width: 0 0.15em 0.15em 0;
 transform: rotate(45deg);
}
`;