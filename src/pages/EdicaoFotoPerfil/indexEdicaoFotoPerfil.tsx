import React, { useState } from "react";
import axios from "axios";
import { Container, Content } from "./styleEdicaoFotoPerfil";
import CabecalhoTela from "../../Components/CabecalhoTela/indexCabecalhoTela";
import { marromEscuro } from "../../utils/colors";
import InputButton from "../../Components/InputButton/indexInputButton";
import InputFile from "../../Components/InputFile/indexInputFile";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EdicaoFotoPerfil: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const imageUrl = response.data.url;
        setProfileImage(imageUrl);
        toast.success('Foto de perfil atualizada com sucesso!');
        navigate('/gerenciamento');
      }
    } catch (error) {
      toast.error('Erro ao atualizar a foto de perfil.');
    }
  };

  return (
    <Container>
      <CabecalhoTela />
      <Content>
        <div className="container-cadastro-faculdade">
          <h2 className="title" style={{fontSize: '36px'}}>Editar Foto de Perfil</h2>
          {preview && <img src={preview} alt="Pré-visualização" width={170} />}
          <InputFile onChange={handleFileChange} />
          <InputButton onClick={handleUpload} text="Atualizar Foto" />
        </div>
      </Content>
    </Container>
  );
};

export default EdicaoFotoPerfil;
