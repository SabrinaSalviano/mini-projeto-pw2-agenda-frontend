import React, { useEffect, useState } from "react"
import { Button } from 'semantic-ui-react'

import './style.css';
import api from "../../api";
import Contato from "../Contato"
import Formulario from "../Formulario"
import Header from "../Header";

const Contatos = () => {
    const [contatos, setContatos] = useState([]);
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [editando, setEditando] = useState(false);
    const [id, setId] = useState(null);

    useEffect(() => {
        api
            .get("/contato")
            .then((response) => setContatos(response.data.contatos))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, []);

    const idUser = localStorage.getItem("idUser")

    // Função para editar um contato existente
    const handleEditar = (id) => {

        const contato = contatos.find(c => c.id === id);
        setNome(contato.nome);
        setTelefone(contato.telefone);
        setEditando(true);
        setId(id);

    };

    const handleDeletar = (id) => {
        const headers = {
            'Auth-Token': `${localStorage.getItem("token")}`
        };

        try {
            api.delete(`/contato/${id}`, { headers })
            setContatos(contatos.filter(contato => contato.id !== id))
            alert("Contato deletado!")
        } catch (err) {
            console.log(err)
        }

    }

    // Função para atualizar a lista de contatos
    const updateContatos = (contatoAtualizado) => {

        setContatos(contatos.push(contatoAtualizado))


        setId(null);
        setNome('');
        setTelefone('');
        setEditando(false);
    }

    return (
        <>
            <Header />
            {editando && <Formulario props={{ id, nome, telefone }} updateContatos={updateContatos} />}
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Nome</td>
                        <td>Telefone</td>
                        <td> </td>
                        <td> </td>
                    </tr>
                </thead>
                <tbody>
                    {contatos.map(item => (
                       idUser === item.idUser ? <Contato key={item.id} props={item} handleEditar={handleEditar} handleDeletar={handleDeletar} />: false
                    ))}
                </tbody>
            </table>
            {!editando && <Button className="botao-add" onClick={() => setEditando(true)}>Adicionar</Button>}
        </>
    )
}

export default Contatos