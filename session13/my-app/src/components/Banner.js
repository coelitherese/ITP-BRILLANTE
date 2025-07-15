import { Container, Button } from "react-bootstrap"

export default function Banner(){
    return(
        <Container className="bg-light p-3 rounded-3 text-center">
            <h1 className="display-3 fw-bold">Welcome to UA Online Shop!</h1>
            <p className="display-6">Opportunities for everyone, everywhere!</p>
            <Button className="p-3 rounded-pill px-5 my-4">Shop Now</Button>
        </Container>
    )
}