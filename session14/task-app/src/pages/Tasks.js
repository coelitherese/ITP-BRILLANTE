import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useAuth } from '../AuthContext'
import { useNavigate } from 'react-router-dom';



export default function Tasks() {

    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if(!user){
        navigate("/login")
      }else{
        document.title = `${user.fname} ${user.lname}'s tasks`
      }

    } , [])

  return (
    <Container fluid className='m-1 m-lg-5 border rounded-4 p-1 p-lg-4 d-flex flex-column justify-content-center align-items-center'>
        <h1 className='my-3 display-3 fw-bold'>WELCOME TO TASK PAGE!</h1>
    </Container>
  )
}
