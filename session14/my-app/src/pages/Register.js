import {  useEffect, useState } from "react"
import { Container, Form, Button } from "react-bootstrap"
import Swal from "sweetalert2";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";


export default function Register() {

    const { user } = useAuth();
    const navigate = useNavigate();

  useEffect(() => {
    document.title = "UTask - REGISTER";
    if(user){
      navigate("/tasks");
    }
  }, [user, navigate]);


    let [fname, setFname] =useState("");
    let [mname, setMname] =useState("");
    let [lname, setLname] =useState("");
    let [email, setEmail] =useState("");
    let [pass, setPass] =useState("");
    let [confirmPass, setConfirmPass] =useState("");

    let [passMessage, setPassMessage] = useState("");

    useEffect(() => {
        if(pass.length === 0 && confirmPass.length === 0){
            setPassMessage("");
        }else{

            if(pass.length >= 1 && pass.length <= 7){
                setPassMessage({
                    message: "Password must be 8 characters long.",
                    css: "fw-bold text-danger"
                });
            }else{

                if(pass !== confirmPass){
                    setPassMessage({
                    message: "Password do not match",
                    css: "fw-bold text-warning"
                });
                }else{
                    setPassMessage({
                    message: "Password matched.",
                    css: "fw-bold text-success"
                    });
                }
                
            }
        }
    }, [pass, confirmPass])



    function register(e){
        e.preventDefault();

        if(pass !== confirmPass){
            Swal.fire({
                title: "OOPS!",
                text: "Password do not match",
                icon: "warning"
            })
            return;
        }
        if(pass.length < 8){
            Swal.fire({
                title: "OOPS!",
                text: "Password must be 8 characters long.",
                icon: "warning"
            })
            return;
        }

        fetch("http://localhost:4000/users/register", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({fname, mname, lname, email, pass})
        })
        .then(res => res.json())
        .then(data => {
            if(data.code === 1){
                Swal.fire({
                    title: "Registered!",
                    text: data.details,
                    icon: "success"
                })

                setFname("");
                setMname("");
                setLname("");
                setEmail("");
                setPass("");
                setConfirmPass("");

            }else if(data.code === 2){
                Swal.fire({
                    title: "OOPS!",
                    text: data.details,
                    icon: "warning"
                })
            }else{
                Swal.fire({
                    title: "OOPS!",
                    text: data.details,
                    icon: "error"
                })
            }
        })
    }

    
  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">

        <Container className="p-1 p-lg-5 d-flex align-items-center justify-content-center flex-column border my-5 rounded-4">

        <h1 className="display-3 fw-bold text-primary">Sign Up</h1>

            <Form className="my-3 p-3 col-12 col-lg-4" onSubmit={register}>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control 
                type="text" 
                placeholder="First Name" required 
                onChange={e => setFname(e.target.value)} 
                value={fname}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control type="text" placeholder="Middle Name" required 
                onChange={e => setMname(e.target.value)} 
                value={mname}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control type="text" placeholder="Last Name" required 
                onChange={e => setLname(e.target.value)} 
                value={lname}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control type="email" placeholder="Email" required 
                onChange={e => setEmail(e.target.value)} 
                value={email}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control type="password" placeholder="Password" required 
                onChange={e => setPass(e.target.value)} 
                value={pass}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control type="password" placeholder="Confirm Password" required 
                onChange={e => setConfirmPass(e.target.value)} 
                value={confirmPass}/>
            </Form.Group>

            <p className={passMessage.css}>{passMessage.message}</p>

            <Button className="w-100 p-2" type="submit">Sign Up</Button>

            <p className="mt-3">Already have an account? <a href="/login">Log in?</a></p>
        </Form>
        </Container>
        
    </Container>
  )
}