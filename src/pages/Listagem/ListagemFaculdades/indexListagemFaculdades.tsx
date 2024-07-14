import React, { useEffect, useState } from "react";
import CabecalhoTela from "../../../Components/CabecalhoTela/indexCabecalhoTela";
import {
  Faculdade,
  deleteFaculdade,
  getFaculdades,
} from "../../../services/faculdadeServices";
import Pagination from "@mui/material/Pagination";
import { FaTrash, FaPen } from "react-icons/fa";
import { marromEscuro, redHalley } from "../../../utils/colors";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Container, Content, Modal, Overlay } from "./styleListagemFaculdades";
import { IoIosArrowDown } from "react-icons/io";

const ListagemFaculdades: React.FC = () => {
  const navigate = useNavigate();
  const [faculdades, setFaculdades] = useState<Faculdade[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsuarioId, setSelectedUsuarioId] = useState<string | null>(
    null
  );
  const [modalPosition, setModalPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const itemsPerPage = 7;

  useEffect(() => {
    const fetchFaculdades = async () => {
      const dataFaculdades = await getFaculdades();
      setFaculdades(dataFaculdades);
    };

    fetchFaculdades();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = faculdades.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(faculdades.length / itemsPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFaculdade(id);
      setFaculdades(faculdades.filter((faculdade) => faculdade.ID !== id));
      toast.success("Faculdade excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar faculdade:", error);
      toast.error("Falha ao excluir faculdade");
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/cadastro/faculdades/${id}`);
  };

  const handleAddFaculdade = () => {
    navigate("/cadastro/faculdades");
  };

  const handleCloseModal = () => {
    setSelectedUsuarioId(null);
    setModalPosition(null);
  };

  const handleOpenModal = (id: string, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setModalPosition({ 
        top: rect.top + window.scrollY, 
        left: (rect.left + window.scrollX) - 16 
    });
    setSelectedUsuarioId(id);
};

  return (
    <Container>
      <CabecalhoTela />
      <Content>
        <h1 className="title">
          Listagem de Faculdades{" "}
          <span className="add-faculdade" onClick={handleAddFaculdade}>
            +
          </span>
        </h1>
        <div className="container-listagem">
          <div className="cabecalho">
            <p>Nome</p>
            <p>Sigla</p>
            <p>Cidade</p>
            <p>CNPJ</p>
            <p>Telefone</p>
            <p></p>
          </div>
          {currentItems.map((faculdade) => (
            <div className="corpo-listagem" key={faculdade.ID}>
              <p>{faculdade.NOME_FACULDADE}</p>
              <p>{faculdade.SIGLA_FACULDADE}</p>
              <p>{faculdade.CIDADE}</p>
              <p>{faculdade.CNPJ}</p>
              <p>{faculdade.TELEFONE}</p>
              <p className="actions">
                <IoIosArrowDown
                  style={{ fontSize: "22px", cursor: "pointer" }}
                  onClick={(e) => handleOpenModal(faculdade.ID, e)}
                />
              </p>
            </div>
          ))}
        </div>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
        />
      </Content>
      {selectedUsuarioId && modalPosition && (
        <>
          <Overlay onClick={handleCloseModal} />
          <Modal style={{ top: modalPosition.top, left: modalPosition.left }}>
            <IoIosArrowDown style={{ fontSize: "22px", cursor: "pointer" }} />
            <div className="modal-content">
              <div
                className="modal-item"
                onClick={() => handleEdit(selectedUsuarioId)}
              >
                <FaPen />
                <span>Editar</span>
              </div>
              <div
                className="modal-item"
                onClick={() => handleDelete(selectedUsuarioId)}
              >
                <FaTrash />
                <span>Excluir</span>
              </div>
            </div>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default ListagemFaculdades;
