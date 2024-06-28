import React, { useEffect, useRef, useState } from 'react';
import { marromEscuro } from '../../utils/colors';
import { ModalContainer, ModalContent } from './styleModalPontos';
import { Ponto, getPontos } from '../../services/pontosServices';

interface ModalPontosProps {
    isOpen: boolean;
    onClose: () => void;
    onPontoSelecionado: (pontoId: string, pontoNome: string) => void;
}

const ModalPontos: React.FC<ModalPontosProps> = ({ isOpen, onClose, onPontoSelecionado }) => {

    const [pontos, setPontos] = useState<Ponto[]>([]);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchPontos = async () => {
            const dataPontos = await getPontos();
            setPontos(dataPontos);
        }
        fetchPontos();
    }, []);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose(); 
        }
    };

    const handlePontoClick = (pontoId: string, pontoNome: string) => {
        onPontoSelecionado(pontoId, pontoNome);
    };

    if (!isOpen) return null;

    return (
        <ModalContainer onClick={handleOverlayClick}>
            <ModalContent ref={modalRef}>
                <h1 style={{color: `${marromEscuro}`}}>Selecione o Ponto</h1>
                <div className="div-separator">
                    {pontos.map(ponto => (
                        <div className='faculdades-line' key={ponto.ID} onClick={() => handlePontoClick(ponto.ID, ponto.NOME_PONTO)}>
                            <p>{ponto.NOME_PONTO}</p>
                            <label className="container">
                                <input type="checkbox" />
                                <div className="checkmark"></div>
                            </label>
                        </div>
                    ))}
                </div>
            </ModalContent>
        </ModalContainer>
    );
};

export default ModalPontos;
