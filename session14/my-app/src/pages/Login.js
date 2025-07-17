import { use, useEffect, useState } from "react"
import { Container, Form, Button } from "react-bootstrap"
import Swal from "sweetalert2"
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";




export default function Login() {

  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "UTask - LOGIN";
    if (user) {
      navigate("/tasks");
    }
  }, [user, navigate]);



  let [email, setEmail] = useState("");
  let [pass, setPass] = useState("");

  function loginUser(e) {
    e.preventDefault();

    fetch("http://localhost:4000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, pass })
    })
      .then(res => res.json())
      .then(data => {
        if (data.code === 1) {
          Swal.fire({
            title: "Logged In!",
            text: data.details,
            icon: "success"
          })

          login(data.user_data);
          setEmail("");
          setPass("");

          navigate("/tasks");

        } else if (data.code === 2) {
          Swal.fire({
            title: "Oops!",
            text: data.details,
            icon: "warning"
          })
        } else if (data.code === 3) {
          Swal.fire({
            title: "Error!",
            text: data.details,
            icon: "error"
          })
        } else {
          Swal.fire({
            title: "Oops!",
            text: data.details,
            icon: "error"
          })
        }

      })
  }




  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">

      <Container className="p-1 p-lg-5 d-flex align-items-center justify-content-center flex-column border my-5 rounded-4">

        <h1 className="display-3 fw-bold text-primary">Log In</h1>

        <Form className="my-3 p-3 col-12 col-lg-4" onSubmit={loginUser}>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="email" placeholder="Email" required onChange={e => setEmail(e.target.value)} value={email} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="password" placeholder="Password" required onChange={e => setPass(e.target.value)} value={pass} />
          </Form.Group>
          <p>Don't have an account <a href="/register">Sign up?</a></p>

          <Button className="w-100 p-2" type="submit">Submit</Button>


        </Form>
      </Container>

    </Container>
  )
}
