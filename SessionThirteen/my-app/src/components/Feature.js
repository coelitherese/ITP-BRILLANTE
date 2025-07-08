import { Container, Row, Col} from "react-bootstrap"

export default function Feature() {
  return (
    <Container className="p-5 rounded-3 my-2 bg-warning-subtle">
        <Row className="gap-3">
            <Col className="border border-primary text-center p-3 rounded-5 shadow">
                <h1 className="fw-bold">FREE SHIPPING</h1>
                <p>We offer free shipping across Pampanga!</p>
            </Col>
            <Col className="border border-primary text-center p-3 rounded-5 shadow">
                <h1 className="fw-bold">50% DISCOUNT FOR UA STUDENTS!</h1>
                <p>A 50% discount can be availed by UA students from the Secondary Level to College</p>
            </Col>
            <Col className="border border-primary text-center p-3 rounded-5 shadow">
                <h1 className="fw-bold">VOUCHER PROGRAM</h1>
                <p>More surprises through our voucher program</p>
            </Col>

        </Row>
    </Container>
  )
}
