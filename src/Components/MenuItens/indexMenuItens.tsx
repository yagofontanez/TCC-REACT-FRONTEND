import React, { useState } from 'react';
import { Container } from './styleMenuItens';
import { useNavigate } from 'react-router-dom';

const MenuItens: React.FC = () => {

    const navigate = useNavigate();

    const [arrowDown, setArrowDown] = useState({
        gerenciamentos: false,
        cadastros: false,
        administracao: false
    });

    const transformArrow = (menu: string) => {
        setArrowDown((prevState: any) => {
            const newState: any = {
                gerenciamentos: false,
                cadastros: false,
                administracao: false
            };
            newState[menu] = !prevState[menu];
            return newState;
        });
    }

    return (
        <Container>
            <ul className="navbar-menulist">
                <li>
                    Gerenciamentos
                    <svg
                        onClick={() => transformArrow('gerenciamentos')}
                        className='arrow-span-1'
                        style={{ transform: arrowDown.gerenciamentos ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                    {arrowDown.gerenciamentos && (
                        <div className='container-gerenciamentos'>
                            <ul>
                                <li onClick={() => navigate('/listagem/alunos')}>Alunos</li>
                                <li onClick={() => navigate('/listagem/faculdades')}>Faculdades</li>
                                <li onClick={() => navigate('/listagem/pontos')}>Pontos de Embarque</li>
                                <li onClick={() => navigate('/listagem/motoristas')}>Motoristas</li>
                                <li onClick={() => navigate('/listagem/veiculos')}>Veículos</li>
                            </ul>
                        </div>
                    )}
                </li>
                <li>
                    Cadastros
                    <svg
                        onClick={() => transformArrow('cadastros')}
                        className='arrow-span-2'
                        style={{ transform: arrowDown.cadastros ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                    {arrowDown.cadastros && (
                        <div className='container-cadastros'>
                            <ul>
                                <li onClick={() => navigate('/cadastro/alunos')}>Alunos</li>
                                <li onClick={() => navigate('/cadastro/faculdades')}>Faculdades</li>
                                <li onClick={() => navigate('/cadastro/pontos')}>Pontos de Embarque</li>
                                <li onClick={() => navigate('/cadastro/motoristas')}>Motoristas</li>
                                <li onClick={() => navigate('/cadastro/veiculos')}>Veículos</li>
                                <li onClick={() => navigate('/')}>Administradores</li>
                            </ul>
                        </div>
                    )}
                </li>
                <li>
                    Administração
                    <svg
                        onClick={() => transformArrow('administracao')}
                        className='arrow-span-3'
                        style={{ transform: arrowDown.administracao ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                    {arrowDown.administracao && (
                        <div className='container-administracao'>
                            <ul>
                                <li onClick={() => navigate('/')}>Faculdades</li>
                                <li onClick={() => navigate('/')}>Cidades</li>
                                <li onClick={() => navigate('/')}>Gerar token p/ Cadastro</li>
                            </ul>
                        </div>
                    )}
                </li>
            </ul>
        </Container>
    );
};

export default MenuItens;
