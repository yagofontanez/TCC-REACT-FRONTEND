import React, { useEffect, useRef, useState } from "react";
import { marromEscuro } from "../../utils/colors";
import { Ponto, getPontos } from "../../services/pontosServices";
import { ModalContainer, ModalContent } from "./styleModalVeiculos";

interface ModalVeiculosProps {
  isOpen: boolean;
  onClose: () => void;
  onVeiculoSelecionado: (pontoId: string, pontoNome: string) => void;
}

const ModalVeiculos: React.FC<ModalVeiculosProps> = ({
  isOpen,
  onClose,
  onVeiculoSelecionado,
}) => {
  const veiculos = [
    {
      id: "0b9e95ce-fe01-41ea-9bd4-a71075bcd903",
      descricao: "Ônibus",
    },
    {
      id: "0b0d574a-a3ee-4dde-b207-bde0b6d54e1d",
      descricao: 'Van',
    },
    {
      id: "e2754ce0-1741-4062-ba39-1e4f769c1f38",
      descricao: "Micro-ônibus",
    },
  ];

  const modalRef = useRef<HTMLDivElement>(null);


  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleVeiculoClick = (veiculoId: string, veiculoNome: string) => {
    onVeiculoSelecionado(veiculoId, veiculoNome);
  };

  if (!isOpen) return null;

  return (
    <ModalContainer onClick={handleOverlayClick}>
      <ModalContent ref={modalRef}>
        <h1 style={{ color: `${marromEscuro}` }}>Selecione o Veículo</h1>
        <div className="div-separator">
          {veiculos.map((veiculo) => (
            <div
              className="faculdades-line"
              key={veiculo.id}
              onClick={() => handleVeiculoClick(veiculo.id, veiculo.descricao)}
            >
              <p>{veiculo.descricao}</p>
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

export default ModalVeiculos;
