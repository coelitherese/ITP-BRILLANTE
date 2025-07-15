import { Container, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function Error() {
  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">

        <Container className="p-1 p-lg-5 d-flex align-items-center justify-content-center flex-column border my-5 rounded-4 text-center">

        <h1 className="display-3 fw-bold text-primary">OOPS!</h1>
        <h1 className="display-5">The page you are trying to access cannot be found.</h1>

        <Button className="px-5 rounded-pill my-5" as={Link} to="/login">Login</Button>

            
        </Container>
        
    </Container>
  )
}
