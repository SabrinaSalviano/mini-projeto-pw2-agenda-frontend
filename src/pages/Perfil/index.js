import React, { useState, useEffect } from "react";
import api from "../../api";
import { Button } from 'semantic-ui-react'
import "./style.css"
import Usuario from "../../components/Usuario";
import Header from "../../components/Header"

const Perfil = () => {

  const isAdmin = localStorage.getItem('admin');
  const userId = localStorage.getItem('idUser');
  const headers = {
      'Auth-Token': `${localStorage.getItem("token")}`
    };
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api
      .get("/users", { headers })
      .then((response) => setUsers(response.data.users))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });

  }, []);


  useEffect(() => {
    api
      .get(`/users/${userId}`,{ headers })
      .then((response) => setFormData(response.data.user))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });

  }, [userId]);

  const [formData, setFormData] = useState({
    id: " ",
    username: " ",
    email: " ",
    password: " ",
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
      const response = await api.patch(`/users/${formData.id}`, formData, { headers });
      const data = response.data;
      alert("Conta atualizada! Necessario que ative a conta novamente")
      alert(data)
    } catch (err) {
      alert(err.message)
    }
  };

  // Função para editar um usuario existente (verificar se atualiza apenas um usuario ou todos)
  const handleEditar = (id) => {

    const user = users.find(el => el.id === id);
    setFormData({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
    })

  };

  // Função para deletar um usuario existente
  const handleDeletar = (id) => {

    const headers = {
      'Auth-Token': `${localStorage.getItem("token")}`
    };

    

    try {
      api.delete(`/users/${id}`,{ headers })
      setUsers(users.filter(users => users.id !== id))
      alert("Conta deletada!")
    } catch (err) {
      console.log(err)
    }

  }
  return (
    <>
      <Header />
      <form onSubmit={handleAtualizar}>
        <div className="form">
          <label>Nome</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div className="form">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form">
          <label>Senha</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>

        <Button className="botao" onClick={handleAtualizar} type="submit">Atualizar</Button>
      </form>
      <table>
        <thead>
          <tr>
            <td>Nome</td>
            <td>Email</td>
            <td>Senha</td>
            <td> </td>
            <td> </td>
          </tr>
        </thead>
        <tbody>
          {isAdmin === "true" ? (
            users.map(item => (
              <Usuario key={item.id} props={item} handleEditar={handleEditar} handleDeletar={handleDeletar} />
            ))
          ) : (
            <tr>
              <td>{formData.username}</td>
              <td>{formData.email}</td>
              <td>{formData.password}</td>
              <td><Button className="update" onClick={() => handleEditar(formData.id)}>Update</Button></td>
            </tr>
          )
          }
        </tbody>
      </table>
    </>
  );
}

export default Perfil