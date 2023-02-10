import React, { useState, useEffect } from "react";
import api from "../../api";
import { Button } from 'semantic-ui-react'
import "./style.css"

const Formulario = ({ props, updateContatos }) => {

  useEffect(() => {
    setFormData({
      nome: props.nome,
      telefone: props.telefone,
      id: props.id,
    })
  }, []);

  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    id: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleAtualizar = async () => {
    const headers = {
      'Auth-Token': `${localStorage.getItem("token")}`
    };
    try {
      const response = await api.patch(`/contato/${formData.id}`, formData, {headers});
      const data = response.data;
      updateContatos(formData)
      alert("Contato atualizado!")

    } catch (err) {
      console.error(err.message)
    }
  };


  const handleAdicionar = async () => {
    const headers = {
      'Auth-Token': `${localStorage.getItem("token")}`
    };

    const body = {"nome": formData.nome, "telefone": formData.telefone, "idUser": localStorage.getItem("idUser")};

    try {
      const response = await api.post(`/contato/`, body, { headers });
      const data = response.data;
      updateContatos(formData)
      alert("Contato adicionado!")
    } catch (err) {
      alert(err.message)
    }
  };


  return (
    <form onSubmit={handleAtualizar}>
      {formData.id && <div className="form">
        <label>ID</label>
        <input type="text" name="id" value={formData.id} onChange={handleChange} disabled/>
      </div>}

      <div className="form">
        <label>Nome</label>
        <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
      </div>
      <div className="form">
        <label>Telefone</label>
        <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} />
      </div>
      {formData.id === null && <Button onClick={handleAdicionar} className="botao" >Adicionar</Button>}
      {formData.id !== null && <button className="botao" type="submit">Atualizar</button>}
    </form>
  );
};

export default Formulario