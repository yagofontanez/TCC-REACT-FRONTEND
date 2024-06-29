import React, { useEffect, useRef, useState } from 'react';
import { Faculdade, getFaculdades } from '../../services/faculdadeServices';
import { marromEscuro } from '../../utils/colors';
import { ModalContainer, ModalContent } from './styleModalMotoristas';
import { Motorista, getMotoristas } from '../../services/motoristasService';

interface ModalMotoristaProps {
    isOpen: boolean;
    onClose: () => void;
    onMotoristaSelecionado: (faculdadeId: string, faculdadeNome: string) => void;
}

const ModalMotoristas: React.FC<ModalMotoristaProps> = ({ isOpen, onClose, onMotoristaSelecionado }) => {

    const [motoristas, setMotoristas] = useState<Motorista[]>([]);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchMotoristas = async () => {
            const dataMotoristas = await getMotoristas();
            setMotoristas(dataMotoristas);
        }
        fetchMotoristas();
    }, []);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose(); 
        }
    };

    const handleMotoristasClick = (motoristaId: string, motoristaNome: string) => {
        onMotoristaSelecionado(motoristaId, motoristaNome);
    };

    if (!isOpen) return null;

    return (
        <ModalContainer onClick={handleOverlayClick}>
            <ModalContent ref={modalRef}>
                <h1 style={{color: `${marromEscuro}`}}>Selecione o Motorista</h1>
                <div className="div-separator">
                    {motoristas.map(motorista => (
                        <div className='faculdades-line' key={motorista.ID} onClick={() => handleMotoristasClick(motorista.ID, motorista.NOME_MOTORISTA)}>
                            <p>{motorista.NOME_MOTORISTA}</p>
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

export default ModalMotoristas;
