import React from "react";
import "./style.css"
import { Button } from 'semantic-ui-react'

const Contato = ({ props, handleEditar, handleDeletar }) => {

    

    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.nome}</td>
            <td>{props.telefone}</td>
            <td><Button className="update" onClick={()=> handleEditar(props.id)}>Update</Button></td>
            <td><Button className="delete" onClick={()=> handleDeletar(props.id)}>Delete</Button></td>
        </tr>
    )
}

export default Contato