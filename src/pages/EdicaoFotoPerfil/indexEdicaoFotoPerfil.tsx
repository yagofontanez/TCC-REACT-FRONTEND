import React, { useState } from "react";
import axios from "axios";
import { Container, Content } from "./styleEdicaoFotoPerfil";
import CabecalhoTela from "../../Components/CabecalhoTela/indexCabecalhoTela";

const EdicaoFotoPerfil: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

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
        console.log('Foto de perfil atualizada com sucesso');
      }
    } catch (error) {
      console.error('Erro ao atualizar a foto de perfil:', error);
    }
  };

  return (
    <Container>
      <CabecalhoTela />
      <Content>
        <div className="container-cadastro-faculdade">
          <h2>Editar Foto de Perfil</h2>
          {preview && <img src={preview} alt="Pré-visualização" width={100} />}
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
        </div>
      </Content>
    </Container>
  );
};

export default EdicaoFotoPerfil;
