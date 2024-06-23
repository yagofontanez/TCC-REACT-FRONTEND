import React, { useEffect, useState } from 'react';
import { Container } from './styleInputForm';

interface propsInput {
    onFocus?: () => void;
    type: any;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForm: React.FC<propsInput> = ({ type, label, value, onChange, onFocus }) => {

    return (
        <Container>
            <div className="input-container">
                <input
                    type={type}
                    value={value}
                    name={type}
                    onChange={onChange}
                    onFocus={onFocus}
                    className="text-input"
                />
                <label htmlFor={label}>{label}</label>
            </div>
        </Container>
    );
};

export default InputForm;
