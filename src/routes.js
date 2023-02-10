import React from 'react';
import './App.css';
import Header from "./components/Header"
import Contatos from "./components/Contatos"
import Usuarios from "./components/Usuarios"
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SignIn from './pages/SignIn';

function AppRoutes() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/signin" component={SignIn} />
        <Route path="/login" component={Login} />
        <Route path="/contatos" component={Contatos} />
        <Route path="/usuarios" component={Usuarios} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;