import React, { useEffect, useState } from 'react';
import { Container } from './styleInputButton';

interface propsButton {
    text: string;
    onClick: () => void;
}

const InputButton: React.FC<propsButton> = ({ text, onClick }) => {

    return (
        <Container>
            <button  onClick={onClick} id="bottone1">{text}</button>
        </Container>
    );
};

export default InputButton;
