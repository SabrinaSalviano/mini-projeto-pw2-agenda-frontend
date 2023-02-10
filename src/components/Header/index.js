import React from "react"
import './header.css';
import { Button } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';


const Header = () => {

    const autenticado = localStorage.getItem('token')

    const navigate = useNavigate();

    const handleProfile = async () => {
        navigate('/profile')
      };
      const handleLogin= async () => {
        navigate('/login')
      };
      const handleSignIn = async () => {
        navigate('/signin')
      };

    return (
        <div className="nav-bar">
            <h1> Mini-Projeto 2 </h1>
            <div className="component">
                {autenticado &&
                <div className="connect">
                    <Button  className="botao" onClick={handleProfile} >Perfil</Button> 
                </div>} 
                <div className="connect">
                    <Button  className="botao" onClick={handleLogin} >Login</Button> 
                </div>
                <div className="connect">
                    <Button  className="botaoS" onClick={handleSignIn} >Cadastre-se</Button> 
                </div>
            </div>
        </div>
    )
}

export default Header