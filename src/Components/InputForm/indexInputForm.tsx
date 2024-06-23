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
                    onFocus={onFocus}
                    className='input-user'
                    required={true}
                    id="input"
                    type={type}
                    value={value}
                    onChange={onChange}
                />
                <label className="label" htmlFor="input">{label}</label>
                <div className="underline"></div>
            </div>
        </Container>
    );
};

export default InputForm;
