import React, { useState, useEffect } from "react";
import api from "../../api";
import { Button } from 'semantic-ui-react'
import "./style.css"
import Logo from '../Images/welcomeBlack.svg'
import { useNavigate } from "react-router-dom";

const SignIn = ({ props, cadastro }) => {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignin = async () => {
    //e.defaultPrevented()
    
    try {
      const response = await api.post("/users/register", formData)
      alert("Conta registrada!")
      navigate("/login")
    } catch (err) {
      alert("Error")
      console.log(err)
    }
  }

  return (
    <>
      <form>
        <img className="imgLogin" src={Logo} />

        <div className="form">
          <label>User</label>
          <input type="text" name="username" onChange={handleChange} />
        </div>

        <div className="form">
          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} />
        </div>

        <div className="form">
          <label>Senha</label>
          <input type="password" name="password" onChange={handleChange} /> <br></br>
        </div>
      </form>
      <Button className="botao" onClick={handleSignin} >Cadastrar</Button>
    </>
  );
};

export default SignIn
