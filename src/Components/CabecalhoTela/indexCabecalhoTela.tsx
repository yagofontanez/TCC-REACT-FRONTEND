// src/App.tsx
import React, { useEffect, useState } from 'react';
import { Container } from './styleCabecalhoTela';
import yourLogoHere from '../../assets/your-logo-here.jpg';
import MenuItens from '../MenuItens/indexMenuItens';
import { FaUser } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { marromClaro, marromEscuro, redHalley, whiteHalley } from '../../utils/colors';
import { useNavigate } from 'react-router-dom';
import { PedidoCadastro, getPedidos } from '../../services/pedidosCadastroServices';

const CabecalhoTela: React.FC = () => {

  const navigate = useNavigate();

  const [arrowDown, setArrowDown] = useState({
    user: false
  });
  const [alertNotification, setAlertNotification] = useState<PedidoCadastro[]>([]);

  const transformArrow = (menu: string) => {
    setArrowDown((prevState: any) => ({
      ...prevState,
      [menu]: !prevState[menu]
    }));
  }

  useEffect(() => {
    const getPedidosCadastro = async () => {
      const pedidosCadastro = await getPedidos();
      console.log(pedidosCadastro, 'pedidosCadastro');
      setAlertNotification(pedidosCadastro);
    }

    getPedidosCadastro();
  }, []);


  console.log(alertNotification.length, 'alertNotification')

  return (
    <Container>
      <img
        style={{cursor: 'pointer'}}
        onClick={() => navigate('/gerenciamento')}
        src={yourLogoHere}
        width={66}
      />
      <MenuItens />
      <div className="menu-user">
        <ul>
          <li>
            <div className="icons">
              <IoIosNotifications size={30} color={alertNotification.length === 0 ? whiteHalley : redHalley} />
              <FaUser size={30} color={whiteHalley} />
            </div>
            <svg
              onClick={() => transformArrow('user')}
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: arrowDown.user ? 'rotate(180deg)' : 'rotate(0deg)' }}
              width="16"
              height="16"
              fill="currentColor"
              color='white'
              viewBox="0 0 16 16">
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
            {arrowDown.user && (
              <div className='container-user'>
                <ul>
                <li onClick={() => navigate('/')}>Conta</li>
                <li onClick={() => navigate('/')}>Sair</li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>
    </Container>
  );
};

export default CabecalhoTela;
