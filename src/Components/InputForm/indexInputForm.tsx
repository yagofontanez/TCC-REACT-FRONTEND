import React, { useEffect, useState } from 'react';
import { Container } from './styleInputForm';

interface propsInput {
    onFocus?: () => void;
    type: any;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    maxLength?: number;
    onBlur?: any;
}

const InputForm: React.FC<propsInput> = ({ type, label, value, onChange, onFocus, onBlur, maxLength }) => {

    return (
        <Container>
            <div className="input-container">
                <input
                    type={type}
                    value={value}
                    name={type}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    className="text-input"
                    maxLength={maxLength}
                />
                <label htmlFor={label}>{label}</label>
            </div>
        </Container>
    );
};

export default InputForm;
