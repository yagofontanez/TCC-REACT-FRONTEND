// src/Components/CabecalhoTela/indexCabecalhoTela.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from './styleCabecalhoTela';
import defaultProfileImage from '../../assets/your-logo-here.jpg';
import MenuItens from '../MenuItens/indexMenuItens';
import { FaUser } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import axios from 'axios';
import { marromClaro, marromEscuro, redHalley, whiteHalley } from '../../utils/colors';
import { PedidoCadastro, getPedidos } from '../../services/pedidosCadastroServices';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: string;
}

const CabecalhoTela: React.FC<{ profileImage?: string }> = ({ profileImage }) => {
  const navigate = useNavigate();
  const [arrowDown, setArrowDown] = useState({ user: false });
  const [alertNotification, setAlertNotification] = useState<PedidoCadastro[]>([]);
  const [profileImg, setProfileImg] = useState<string>(profileImage || defaultProfileImage);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/admin/profile', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        setProfileImg(response.data.FOTO_PERFIL || defaultProfileImage);
      } catch (error) {
        console.error('Erro ao buscar a foto de perfil:', error);
      }
    };

    fetchProfileImage();
  }, [profileImage]);

  useEffect(() => {
    const getPedidosCadastro = async () => {
      const pedidosCadastro = await getPedidos();
      setAlertNotification(pedidosCadastro);
    };

    getPedidosCadastro();
  }, []);

  const transformArrow = (menu: string) => {
    setArrowDown((prevState: any) => ({
      ...prevState,
      [menu]: !prevState[menu]
    }));
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  const handleAccountClick = () => {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode<DecodedToken>(token!);
    navigate(`/edicao/admin/${decoded.id}`);
  }

  return (
    <Container>
      <img
        style={{ cursor: 'pointer' }}
        onClick={() => navigate('/gerenciamento')}
        src={profileImg}
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
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 0 0 1 .753 1.659l-4.796 5.48a1 0 0 1-1.506 0z" />
            </svg>
            {arrowDown.user && (
              <div className='container-user'>
                <ul>
                  <li onClick={handleAccountClick}>Conta</li>
                  <li onClick={handleLogout}>Sair</li>
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
