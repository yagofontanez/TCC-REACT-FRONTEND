// src/App.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from './styleLoading';

const Loading: React.FC = () => {

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    }, []);

    return (
        <Container>
            <div className="loader">
                <div className="loader-square"></div>
                <div className="loader-square"></div>
                <div className="loader-square"></div>
                <div className="loader-square"></div>
                <div className="loader-square"></div>
                <div className="loader-square"></div>
                <div className="loader-square"></div>
            </div>
        </Container>
    );
};

export default Loading;
