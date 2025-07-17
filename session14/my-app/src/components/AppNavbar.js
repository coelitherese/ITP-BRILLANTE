// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';

import {Container, Nav, Navbar, Button} from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';






export default function AppNavbar(){

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const logoutUser = () => {
        logout();
        navigate("/login");
    }



    return(
    <Navbar expand="lg" className="bg-body-tertiary shadow p-3 sticky-top">
        <Container fluid>

            {
                !user ? 
                <Navbar.Brand href="/" className='text-primary fw-bold'>UTask</Navbar.Brand>
                :
                <Navbar.Brand href="/" className='text-primary fw-bold'>Hello, {user.fname.toUpperCase()} {user.lname.toUpperCase()}!</Navbar.Brand>
            }

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto gap-3">

                {
                    !user ?
                    <>
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                    </>
                    :
                    <>
                    <Nav.Link as={Link} to="/tasks">Tasks</Nav.Link>
                    <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                    </>
                }



                {
                    !user ? 
                    <Button className='rounded-pill px-5' variant='outline-primary' as={NavLink} to="/login">Login</Button>
                    :
                    <Button className='rounded-pill px-5' variant='outline-danger' onClick={logoutUser}>Logout</Button>
                }


            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}