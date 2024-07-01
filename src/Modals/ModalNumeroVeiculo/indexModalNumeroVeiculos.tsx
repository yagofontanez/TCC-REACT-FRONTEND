import React, { useEffect, useRef, useState } from 'react';
import { Faculdade, getFaculdades } from '../../services/faculdadeServices';
import { marromEscuro } from '../../utils/colors';
import { Motorista, getMotoristas } from '../../services/motoristasService';
import { ModalContainer, ModalContent } from './styleModalNumeroVeiculos';
import { Veiculo, getVeiculos } from '../../services/veiculosServices';

interface ModalNumeroVeiculosProps {
    isOpen: boolean;
    onClose: () => void;
    onNumeroVeiculoSelecionado: (faculdadeId: string, faculdadeNome: string) => void;
}

const ModalNumeroVeiculo: React.FC<ModalNumeroVeiculosProps> = ({ isOpen, onClose, onNumeroVeiculoSelecionado }) => {

    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchVeiculos = async () => {
            const dataVeiculos = await getVeiculos();
            setVeiculos(dataVeiculos);
        }
        fetchVeiculos();
    }, []);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose(); 
        }
    };

    const handleVeiculosClick = (veiculoId: string, veiculoNome: string) => {
        onNumeroVeiculoSelecionado(veiculoId, veiculoNome);
    };

    if (!isOpen) return null;

    return (
        <ModalContainer onClick={handleOverlayClick}>
            <ModalContent ref={modalRef}>
                <h1 style={{color: `${marromEscuro}`}}>Selecione o Número do Veículo</h1>
                <div className="div-separator">
                    {veiculos.map(veiculo => (
                        <div className='faculdades-line' key={veiculo.ID} onClick={() => handleVeiculosClick(veiculo.ID, veiculo.NUMERO_VEICULOS)}>
                            <p>{veiculo.NUMERO_VEICULOS}</p>
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

export default ModalNumeroVeiculo;
