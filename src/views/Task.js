import React , {Fragment,useEffect,useState} from "react";

import Swal from 'sweetalert2';
import axios from 'axios';

// react-bootstrap components
import {
  
  Button,
  Card,
  Form,  
  Container,
  Row,
  Col,
  Table,
  
  
} from "react-bootstrap";


function User() {

  const API = 'http://127.0.0.1:8000/api/';
  const [task,setTask] = React.useState([]);  
  
  const [datos,setDatos] = useState({
    id:'',
    name:'',
    detail:'',
    completed:'',
    date:'',   
    deleted:'',   
 });    


   useEffect( () =>{
    obtenerDatos();
   },[])

   const obtenerDatos =  async () =>{
     const data = await fetch(API+'getTask');
     const _task = await data.json();
     setTask(_task.data[0]);      
   }
  
   const seleccionar = (e) =>{   
 
     return () => {
      setDatos({
        id:e.id,
        name:e.name,
        detail:e.detail,
        completed:e.completed,
        date:e.date,   
        deleted:e.deleted   
      });      
     }
   }

   const onCambio = (e) =>{  
    setDatos({
      ...datos,
      [e.target.name]:e.target.value
    });    
  }

  const enviarDatos = (e) =>{    
    e.preventDefault();    
    if(datos.name == ''){
      Swal.fire(
        'Debe llenar el campo Name',
        'Presione el boton para continuar',
        'error'
      )
      return false;
    }
    if(datos.detail == ''){
      Swal.fire(
        'Debe llenar el campo detail',
        'Presione el boton para continuar',
        'error'
      )
      return false;
    }
   
    onRecarga();
  }


  const onRecarga = () =>{    

    return fetch(API + `createTask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({
         name:datos.name,
         detail:datos.detail,            
        }),
      })
      .then(res => {
        const msj =  res.json();
        msj.then((result)=>{
          if(result.code == 200){
            Swal.fire(
              result.message,
             'Presione el boton para continuar',
             'success'
           )
          datos.name ='';
          datos.detail = '';         

          document.getElementById("frmTask").reset();

          }
          if(result.code == 404){
            Swal.fire(
              result.message,
             'Presione el boton para continuar',
             'error'
           )
          }
         
        });      
        obtenerDatos();
      })
      .then(res => {
         console.log(res);
      })
  }

  const editTask= () =>{
    return fetch(API + `editTask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({
         id:datos.id,
         name:datos.name,
         detail:datos.detail,            
        }),
      })
      .then(res => {
        const msj =  res.json();
        msj.then((result)=>{
          if(result.code == 200){
            Swal.fire(
              result.message,
             'Presione el boton para continuar',
             'success'
           )
          datos.name ='';
          datos.detail = '';         

          document.getElementById("frmTask").reset();

          }
          if(result.code == 404){
            Swal.fire(
              result.message,
             'Presione el boton para continuar',
             'error'
           )
          }         
        });      
        obtenerDatos();
      })
      .then(res => {
         console.log(res);
      })
  }
  const completedTask= () =>{
    return fetch(API + `compledTask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({
         id:datos.id,            
        }),
      })
      .then(res => {
        const msj =  res.json();
        msj.then((result)=>{
          if(result.code == 200){
            Swal.fire(
              result.message,
             'Presione el boton para continuar',
             'success'
           )
          datos.name ='';
          datos.detail = '';         

          document.getElementById("frmTask").reset();

          }
          if(result.code == 404){
            Swal.fire(
              result.message,
             'Presione el boton para continuar',
             'error'
           )
          }         
        });      
        obtenerDatos();
      })
      .then(res => {
         console.log(res);
      })
  }

  const deleteTask= () =>{
    return fetch(API + `deleteTask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({
         id:datos.id,            
        }),
      })
      .then(res => {
        const msj =  res.json();
        msj.then((result)=>{
          if(result.code == 200){
            Swal.fire(
              result.message,
             'Presione el boton para continuar',
             'success'
           )
          datos.name ='';
          datos.detail = '';         

          document.getElementById("frmTask").reset();

          }
          if(result.code == 404){
            Swal.fire(
              result.message,
             'Presione el boton para continuar',
             'error'
           )
          }         
        });      
        obtenerDatos();
      })
      .then(res => {
         console.log(res);
      })
  }

  return (
    <>
    <Container fluid>
      <Row>
        <Col className="pr-1" md="7">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>     
                <th>Name</th>
                <th>Detail</th>
                <th>Date</th>
                <th>Completed</th>              
              </tr>
            </thead>
            <tbody>
             
            {
              task.map(item =>(
                <tr key={item.id} onClick={seleccionar(item)}>
                  <td  value={item.id}>{item.name}</td>
                  <td  value={item.id} >{item.detail}</td>
                  <td  value={item.id} >{item.date}</td>
                  <td  value={item.id} >{item.completed}</td>                                  
                </tr>
              ))
            }
            </tbody>
        </Table>
      </Col>
        
      <Col className="pr-1" md="5">

      <Form onSubmit={enviarDatos} id="frmTask">             

                <Row>
                  <Col md="12">
                  
                  </Col>  
                </Row>
                <Row>
                  <Col md="12">
                    <Form.Group>
                      <label>Name</label>
                      <Form.Control                       
                        placeholder="Name"
                        name="name"
                        type="text"
                        value={datos.name}
                        onChange={onCambio}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <Form.Group>
                      <label>detail</label>
                      <Form.Control
                        placeholder="Detail"
                        name="detail"
                        type="text"
                        value={datos.detail}
                        onChange={onCambio}
                      ></Form.Control>
                    </Form.Group>
                  </Col>                
                </Row>        

                
                <Button
                  className="btn-fill pull-right"
                  type="submit"
                  variant="primary"
                  onClick={enviarDatos}
                >
                  Create Task
                </Button>
                &nbsp;
                <Button
                  className="btn-fill pull-right"                 
                  variant="success"
                  onClick={editTask}
                >
                  Edit Task
                </Button>
                &nbsp;
                <Button
                  className="btn-fill pull-right"                 
                  variant="info"
                  onClick={completedTask}
                >
                  Completed
                </Button>
                &nbsp;
                <Button
                  className="btn-fill pull-right"                  
                  variant="danger"
                  onClick={deleteTask}
                >
                  Delete Task
                </Button>
              <span>  </span>
          
        
                <div className="clearfix"></div>
              </Form>     
      
      </Col>
     </Row>
  </Container>    
    </> 
  );
}

export default User;
