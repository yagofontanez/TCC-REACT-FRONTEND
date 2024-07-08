import React, { useEffect, useRef, useState } from 'react';
import { Faculdade, getFaculdades } from '../../services/faculdadeServices';
import { marromEscuro } from '../../utils/colors';
import { ModalContainer, ModalContent } from './styleModalDeInfo';
import InputButton from '../../Components/InputButton/indexInputButton';
import { useNavigate } from 'react-router-dom';

interface ModalDeInfoProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalDeInfo: React.FC<ModalDeInfoProps> = ({ isOpen, onClose }) => {

    const modalRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose(); 
        }
    };

    if (!isOpen) return null;

    return (
        <ModalContainer onClick={handleOverlayClick}>
            <ModalContent ref={modalRef}>
                <h1 style={{color: `${marromEscuro}`}}>Onde pegar o token?</h1>
                <div className="div-separator">
                    <p>
                        Para pegar o token, vá até a tela inicial do sistema, clique no menu de Administração, e clique em 'Gerar token p/ Cadastro'. O token será colado para a sua área de transferência.
                    </p>
                    <InputButton 
                        onClick={() => navigate('/gerenciamento')}
                        text='Ir para a tela inicial'
                    />
                </div>
            </ModalContent>
        </ModalContainer>
    );
};

export default ModalDeInfo;
