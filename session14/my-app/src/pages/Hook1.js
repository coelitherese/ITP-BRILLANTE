import { useState } from "react"
import { Container, Button } from "react-bootstrap"


export default function Hook1() {

    let [count, setCount] = useState(0);


    function increment(){
        if(count == 30) {
            alert("Cannot increase higher than 30.")
        }else{
            setCount(count += 1);
        }
    }

    function decrement(){
        if(count == 0) {
            alert("Cannot decrease lower than 0.")
        }else{
            setCount(count -= 1);
        }
    }


  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center flex-column">

    <h1 className="display-2 my-5">Count: {count}</h1>
    <Button onClick={e =>increment(e)}>Increase</Button>
    <Button onClick={e =>decrement(e)}>Decrease</Button>

    </Container>
  )
}
