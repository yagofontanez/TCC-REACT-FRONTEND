// src/App.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from './styleLoading';

const Loading: React.FC = () => {

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    }, []);
    
    return (
        <Container>
            <div className="loader3">
                <div className="circle1"></div>
                <div className="circle1"></div>
                <div className="circle1"></div>
                <div className="circle1"></div>
                <div className="circle1"></div>
            </div>

        </Container>
    );
};

export default Loading;
