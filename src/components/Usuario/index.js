import React from "react";
import "./style.css"
import { Button } from 'semantic-ui-react'

const Usuario = ({ props, handleEditar, handleDeletar }) => {


    return (
        <tr>
            <td>{props.username}</td>
            <td>{props.email}</td>
            <td>{props.password}</td>
            <td><Button className="update" onClick={()=> handleEditar(props.id)}>Update</Button></td>
            <td><Button className="delete" onClick={()=> handleDeletar(props.id)}>Delete</Button></td>
        </tr>
        
    )
}

export default Usuario