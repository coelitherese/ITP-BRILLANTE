import { Container, Button, Image, Col, Row, ButtonGroup } from "react-bootstrap"
import { DoorOpen, PersonPlus, Clipboard } from "react-bootstrap-icons";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext";
import { useEffect } from "react";

export default function Home() {

    const { user } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            document.title = `UTask`
        } else {
            document.title = `${user.fname.toUpperCase()} - Home`
        }
    }, [user, navigate])
    return (

        <Container fluid className='m-1 m-lg-5 p-1 p-lg-4 d-flex flex-column'>
            <Row xs={1} md={2} lg={3} className='my-2 d-flex justify-content-center align-items-center'>
                <Col className="p-5">
                    <Image src="https://media-public.canva.com/QFtjY/MAFEKnQFtjY/1/tl.png" className="m-1 m-lg-5 p-lg-4 img-fluid" width={500} />
                </Col>
                <Col className="px-5">
                    <h1 className="fw-bold display-3 text-primary-emphasis">WELCOME TO UTASK!</h1>
                    {
                        !user ?
                            <h4 className="py-1">Hello there!</h4>
                            :
                            <h4 className="py-1">Hello, {user.fname.toUpperCase()} {user.lname.toUpperCase()}!</h4>
                    }
                    <p className="py-4">Your Ultimate Online Task Organizer
                        UTask is a powerful online task compiler designed to help you streamline your to-do lists and achieve peak productivity. Easily create, and manage all your tasks in one intuitive platform. Whether you're tackling daily chores, managing complex projects, or planning future goals, UTask provides the tools you need to stay organized and focused. Say goodbye to scattered notes and missed deadlines – with UTask, bringing order to your tasks has never been simpler.</p>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center align-items-center'>
                <Col className='d-flex justify-content-center align-items-center'>
                    {
                        !user ?
                            <ButtonGroup>
                                <Button variant="warning" className='px-5' as={NavLink} to="/login"> <DoorOpen /> LOG IN</Button>
                                <Button variant="success" className='px-5' as={NavLink} to="/register"> <PersonPlus /> REGISTER</Button>
                            </ButtonGroup>
                            :
                            <Button variant="primary" className='px-5' as={NavLink} to="/tasks"> <Clipboard /> VIEW TASKS</Button>
                    }

                </Col>
            </Row>
        </Container>
    );
}