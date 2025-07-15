// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';

import {Container, Nav, Navbar} from 'react-bootstrap';


export default function AppNavbar(){
    return(
    <Navbar expand="lg" className="bg-body-tertiary shadow p-3 sticky-top">
        <Container fluid>
            <Navbar.Brand href="#home" className='text-primary fw-bold'>UA Online Shop</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
                <Nav.Link >Home</Nav.Link>
                <Nav.Link >Products</Nav.Link>
                <Nav.Link >About</Nav.Link>
                <Nav.Link >Contact</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}