import React, { useState, useEffect } from "react";
import api from "../../api";
import { Button } from 'semantic-ui-react'
import "./style.css"
import Logo from '../Images/loginBlack.svg'
import { useNavigate } from 'react-router-dom';

const Login = ({ props, login }) => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogar = async () => {
    try {
      const response = await api.post("users/login", formData)
      console.log(response.data);
      const data = response.data;
      localStorage.setItem("token", data.token);
      localStorage.setItem("idUser", data.idUser);
      localStorage.setItem("admin", data.admin);
      alert("Usuario logado!")
      navigate('/')
      
    } catch (err) {
      alert(err);
    }
    
  };

  return (
    <>
      <div className="div-form">

        <img className="imgLogin" src={Logo} /><br></br>

        <div className="form">
          <label>Email</label>
          <input type="text" name="email" onChange={handleChange} />
        </div>

        <div className="form">
          <label>Senha</label>
          <input type="password" name="password" onChange={handleChange} />
        </div>

        <Button className="botao" onClick={handleLogar}>Logar</Button>
      </div>


      <p>Ainda não tem cadastro ? </p>
      <Button className="botao"onClick={() =>  navigate('/signin')}>Clique aqui</Button>

    </>
  );
}

export default Login                