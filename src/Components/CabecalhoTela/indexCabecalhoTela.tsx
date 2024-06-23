// src/App.tsx
import React from 'react';
import { Container } from './styleCabecalhoTela';
import yourLogoHere from '../../assets/your-logo-here.jpg';

const CabecalhoTela: React.FC = () => {


  return (
    <Container>
        <img src={yourLogoHere} width={66} />
    </Container>
  );
};

export default CabecalhoTela;
