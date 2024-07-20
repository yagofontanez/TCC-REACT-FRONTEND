import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "./styleCabecalhoTela";
import defaultProfileImage from "../../assets/your-logo-here.jpg";
import MenuItens from "../MenuItens/indexMenuItens";
import { FaUser } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { MdNotifications, MdNotificationsActive } from "react-icons/md";
import axios from "axios";
import {
  bege,
  grayHalley,
  marromClaro,
  marromEscuro,
  redHalley,
  whiteHalley,
} from "../../utils/colors";
import {
  PedidoCadastro,
  getPedidos,
} from "../../services/pedidosCadastroServices";
import { jwtDecode } from "jwt-decode";
import ModalNotificacoes from "../../Modals/ModalNotificacoes/indexModalNotificacoes";

interface DecodedToken {
  id: string;
}

const CabecalhoTela: React.FC<{ profileImage?: string }> = ({
  profileImage,
}) => {
  const navigate = useNavigate();
  const [arrowDown, setArrowDown] = useState({ user: false });
  const [alertNotification, setAlertNotification] = useState<PedidoCadastro[]>(
    []
  );
  const [profileImg, setProfileImg] = useState<string>(
    profileImage || defaultProfileImage
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/admin/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProfileImg(response.data.FOTO_PERFIL || defaultProfileImage);
      } catch (error) {
        console.error("Erro ao buscar a foto de perfil:", error);
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
      [menu]: !prevState[menu],
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAccountClick = () => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode<DecodedToken>(token!);
    navigate(`/edicao/admin/${decoded.id}`);
  };

  return (
    <Container isMenuOpen={isMenuOpen}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem'}}>
        <img
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/gerenciamento")}
          src={profileImg}
          width={66}
        />
        <MenuItens onMenuToggle={setIsMenuOpen} />
      </div>
      <div className="menu-user">
        <ul>
          <li>
            <div className="icons">
              {alertNotification.length > 0 ? (
                <MdNotificationsActive
                  style={{marginLeft: '1.6rem', display: isMenuOpen ? 'flex' : 'none'}}
                  size={44}
                  color={redHalley}
                  onClick={() => setNotificationOpen(true)}
                  className='shake-animation'
                />
              ) : (
              <MdNotifications
                style={{marginLeft: '1.6rem', display: isMenuOpen ? 'flex' : 'none'}}
                size={44}
                color={alertNotification.length === 0 ? whiteHalley : grayHalley}
                onClick={() => setNotificationOpen(true)}
              />
              )}

            </div>
            {isMenuOpen && (
              <div className="container-user">
                <ul>
                  <li onClick={handleLogout}>Sair</li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>
      {notificationOpen && (
        <ModalNotificacoes isOpen={notificationOpen} onClose={() => setNotificationOpen(false)} />
      )}
    </Container>
  );
};

export default CabecalhoTela;
