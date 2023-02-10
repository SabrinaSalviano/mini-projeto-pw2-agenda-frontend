import { Routes, Route } from 'react-router-dom';

import Header from "./components/Header"
import Contatos from "./components/Contatos"
import Login from "./pages/Login"
import SignIn from "./pages/SignIn"
import Perfil from './pages/Perfil';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Contatos/>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/profile' element={<Perfil/>}/>
      </Routes>
    
    </>
  );
}

export default App;