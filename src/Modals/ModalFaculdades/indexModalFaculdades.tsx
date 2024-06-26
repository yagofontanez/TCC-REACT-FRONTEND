import React, { useEffect, useRef, useState } from 'react';
import { ModalContainer, ModalContent } from './styleModalFaculdades';
import { Faculdade, getFaculdades } from '../../services/faculdadeServices';
import { marromEscuro } from '../../utils/colors';

interface ModalFaculdadesProps {
    isOpen: boolean;
    onClose: () => void;
    onFaculdadeSelecionada: (faculdadeId: string, faculdadeNome: string) => void;
}

const ModalFaculdades: React.FC<ModalFaculdadesProps> = ({ isOpen, onClose, onFaculdadeSelecionada }) => {

    const [faculdades, setFaculdades] = useState<Faculdade[]>([]);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchFaculdades = async () => {
            const dataFaculdades = await getFaculdades();
            setFaculdades(dataFaculdades);
        }
        fetchFaculdades();
    }, []);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose(); 
        }
    };

    const handleFaculdadeClick = (faculdadeId: string, faculdadeNome: string) => {
        onFaculdadeSelecionada(faculdadeId, faculdadeNome);
    };

    if (!isOpen) return null;

    return (
        <ModalContainer onClick={handleOverlayClick}>
            <ModalContent ref={modalRef}>
                <h1 style={{color: `${marromEscuro}`}}>Selecione a Faculdade</h1>
                <div className="div-separator">
                    {faculdades.map(faculdade => (
                        <div className='faculdades-line' key={faculdade.ID} onClick={() => handleFaculdadeClick(faculdade.ID, faculdade.NOME_FACULDADE)}>
                            <p>{faculdade.NOME_FACULDADE}</p>
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

export default ModalFaculdades;
