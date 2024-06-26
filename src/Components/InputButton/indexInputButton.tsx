import React, { useEffect, useState } from 'react';
import { Container } from './styleInputButton';

interface propsButton {
    text: string;
    onClick: () => void;
    disabled?: any;
    type?: any;
}

const InputButton: React.FC<propsButton> = ({ text, onClick, disabled, type }) => {

    return (
        <Container>
            <button disabled={disabled} type={type} onClick={onClick} id="bottone1">{text}</button>
        </Container>
    );
};

export default InputButton;
