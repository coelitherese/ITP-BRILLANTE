import { useEffect, useState } from 'react'
import { useAuth } from '../AuthContext'
import { Badge, Button, ButtonGroup, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { CheckCircleFill, PencilSquare, PlusCircle,TrashFill } from 'react-bootstrap-icons';
import Swal from 'sweetalert2';






export default function TaskLists() {

    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");
    const [newTask, setNewTask] = useState({ taskName: "", taskDescription: "" });
    const [selectedTask, setSelectedTask] = useState({ task_id: "", taskName: "" });
    const [editTask, setEditTask] = useState({ taskName: "", taskDescription: "" });

    console.log(selectedTask)


    // Modal useState for Adding Task
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Modal for Delete Confirmation
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    // Modal for Task Completion Confirmation
    const [showCompleted, setShowCompleted] = useState(false);
    const handleCloseCompleted = () => setShowCompleted(false);
    const handleShowCompleted = () => setShowCompleted(true);

    // Modal for Edit Task
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    function formatDate(dateString) {
        if (!dateString) return "-";
        const date = new Date(dateString);
        const datePart = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        const timePart = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
        return `${datePart} at ${timePart}`;
    }

    const fetchTasks = () => {
        if (!user) return;

        fetch(`http://localhost:4000/tasks/all/${user.user_id}`)
            .then(res => res.json())
            .then(data => {
                if (data.code === 1 && Array.isArray(data.details)) {
                    setTasks(data.details);
                    setError("");
                } else if (data.code === 2) {
                    setTasks([]);
                    setError(data.details);
                } else {
                    setTasks([]);
                    setError(data.details);
                }
            })
    }

    const AddTask = (e) => {
        console.log("Addtask");
        e.preventDefault();

        if (!user) return;

        fetch("http://localhost:4000/tasks/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...newTask,
                isActive: 1,
                taskCreated: new Date(),
                user_id: user.user_id
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.code === 1) {
                    Swal.fire({
                        icon: "success",
                        title: "Task Added!",
                        text: data.details
                    })
                    fetchTasks();
                    handleClose();
                    setNewTask({ taskName: "", taskDescription: "" });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops!",
                        text: data.details
                    })
                }
            })
    }

    const deleteTask = (task_id) => {
        if (!user) return;

        fetch(`http://localhost:4000/tasks/delete/${user.user_id}/${task_id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                console.log(task_id)
                if (data.code === 1) {
                    Swal.fire({
                        icon: "success",
                        title: "Task Deleted!",
                        text: data.details
                    })

                    fetchTasks();
                    handleCloseDelete();
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Task Cannot Be Deleted!",
                        text: data.details
                    })
                }
            })
    }

    const taskCompleted = (task_id) => {
        if (!user) return;

        fetch(`http://localhost:4000/tasks/complete/${user.user_id}/${task_id}`, {
            method: "PUT"
        })
            .then(res => res.json())
            .then(data => {
                if (data.code === 1) {
                    Swal.fire({
                        icon: "success",
                        title: "Task Completed!",
                        text: data.details
                    })
                    fetchTasks();
                    handleCloseCompleted();
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops!",
                        text: data.details
                    })
                }
            })
    }

    // Edit Task
    const updateTask = (e) => {
        e.preventDefault();
        if (!user) return;

        fetch(`http://localhost:4000/tasks/update/${user.user_id}/${selectedTask.task_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                taskName: editTask.taskName,
                taskDescription: editTask.taskDescription
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.code === 1) {
                    Swal.fire({
                        icon: "success",
                        title: "Task Updated!",
                        text: data.details
                    });
                    fetchTasks();
                    handleCloseEdit();
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops!",
                        text: data.details
                    });
                }
            });
    };


    useEffect(() => {
        fetchTasks();
    }, [user])


    return (
        <>
            <Container fluid className='d-flex justify-content-end align-items-center mb-4 px-4'>
                <Button
                    className='bg-gradient p-3 px-4 d-flex align-items-center rounded-pill fw-bold border-0 shadow-sm'
                    onClick={handleShow}
                    style={{ backgroundColor: "#ffc107", color: "#000" }}
                >
                    <PlusCircle className="me-2" size={22} /> Add Task
                </Button>
            </Container>


            {/* MODAL FOR ADD TASK */}
            <Modal show={show} onHide={handleClose} centered size='lg'>
                <Modal.Header closeButton className='bg-warning p-4'>
                    <Modal.Title>Add a New Task?</Modal.Title>
                </Modal.Header>

                <Form className='p-1 p-lg-3' onSubmit={AddTask}>
                    <Modal.Body className='p-3'>

                        {/* Task Name Input Field */}
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Task Name"
                                required
                                onChange={e => setNewTask({ ...newTask, taskName: e.target.value })}
                                value={newTask.taskName}
                            />
                        </Form.Group>

                        {/* Task Description Input Field */}
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Task Description"
                                required
                                as="textarea"
                                rows={5}
                                onChange={e => setNewTask({ ...newTask, taskDescription: e.target.value })}
                                value={newTask.taskDescription}
                            />
                        </Form.Group>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button type='submit' variant="success" className='px-5 rounded-pill p-2'>
                            Add
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            {/* MODAL FOR ADD TASK */}


            <Row xs={1} md={2} lg={3} className='my-3'>
                {
                    tasks.map(task => (
                        <>
                            <Col key={task.task_id} className='my-2'>
                                <Card
                                    className='h-100 border rounded-4 p-3 shadow'
                                    style={{ backgroundColor: 'white', borderColor: task.isActive ? '#ffc107' : '#198754', borderWidth: '2px' }}
                                >

                                    <Card.Body>
                                        <div className='d-flex justify-content-between align-items-start mb-2'>
                                            <h4 className='fw-bold text-dark'>{task.taskName}</h4>
                                            <Badge bg={task.isActive ? "warning" : "success"} className="rounded-pill px-3 py-2 text-dark">
                                                {task.isActive ? "Pending" : "Done"}
                                            </Badge>
                                        </div>
                                        <Card.Text className=''>{task.taskDescription}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer className='bg-transparent border-0 mt-auto'>
                                        <p className='mb-1 text-muted small'>📅 Added: {formatDate(task.taskCreated)}</p>
                                        <p className='mb-3 text-muted small'>✅ Completed: {formatDate(task.taskCompleted)}</p>
                                        <ButtonGroup className='w-100 d-flex justify-content-between'>
                                            {
                                                task.isActive ? (
                                                    <Button
                                                        variant="outline-primary"
                                                        title="Edit"
                                                        onClick={() => {
                                                            setSelectedTask(task);
                                                            setEditTask({ taskName: task.taskName, taskDescription: task.taskDescription });
                                                            handleShowEdit();
                                                        }}
                                                    >
                                                        <PencilSquare />
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="outline-secondary"
                                                        disabled
                                                        title="Cannot Edit"
                                                        className="d-flex align-items-center justify-content-center text-muted"
                                                    >
                                                        <PencilSquare />
                                                    </Button>
                                                )
                                            }
                                            <Button variant="outline-danger" title="Delete" onClick={() => {
                                                handleShowDelete();
                                                setSelectedTask(task);
                                            }}>
                                                <TrashFill />
                                            </Button>
                                            {
                                                task.isActive ? (
                                                    <Button
                                                        variant="outline-success"
                                                        title="Mark as Done"
                                                        onClick={() => {
                                                            handleShowCompleted();
                                                            setSelectedTask(task);
                                                        }}
                                                        className="d-flex align-items-center justify-content-center"
                                                    >
                                                        <CheckCircleFill className="me-1" />
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="outline-secondary"
                                                        disabled
                                                        title="Already Completed"
                                                        className="d-flex align-items-center justify-content-center text-muted"
                                                    >
                                                        <CheckCircleFill className="me-1" />
                                                    </Button>
                                                )
                                            }
                                        </ButtonGroup>
                                    </Card.Footer>
                                </Card>
                            </Col>

                            {/* MODAL FOR DELETE CONFIRMATION */}
                            <Modal show={showDelete} onHide={handleCloseDelete} centered size='lg'>
                                <Modal.Header closeButton className='bg-warning p-4'>
                                    <Modal.Title>Please Confirm!</Modal.Title>
                                </Modal.Header>

                                <Modal.Body className='p-3 text-center'>
                                    <h4 className='fw-bold'>
                                        Are you sure you want to delete <span className='text-primary'>{selectedTask.taskName.toUpperCase()}</span>?
                                    </h4>
                                </Modal.Body>

                                <Modal.Footer>
                                    <Button type='submit' variant="secondary" className='px-5 rounded-pill p-2' onClick={handleCloseDelete}>
                                        No
                                    </Button>
                                    <Button type='submit' variant="danger" className='px-5 rounded-pill p-2' onClick={() => deleteTask(selectedTask.task_id)}>
                                        Yes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            {/* MODAL FOR DELETE CONFIRMATION */}

                            {/* MODAL FOR TASK COMPLETION */}
                            <Modal show={showCompleted} onHide={handleCloseCompleted} centered size='lg'>
                                <Modal.Header closeButton className='bg-warning p-4'>
                                    <Modal.Title>Mark as done?</Modal.Title>
                                </Modal.Header>

                                <Modal.Body className='p-3 text-center'>
                                    <h4 className='fw-bold'>
                                        Are you sure you want to mark <span className='text-primary'>{selectedTask.taskName.toUpperCase()}</span> as done?
                                    </h4>
                                </Modal.Body>

                                <Modal.Footer>
                                    <Button type='submit' variant="secondary" className='px-5 rounded-pill p-2' onClick={handleCloseCompleted}>
                                        No
                                    </Button>
                                    <Button type='submit' variant="danger" className='px-5 rounded-pill p-2' onClick={() => taskCompleted(selectedTask.task_id)}>
                                        Yes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            {/* MODAL FOR TASK COMPLETION */}

                            {/* MODAL FOR EDITING TASK */}
                            <Modal show={showEdit} onHide={handleCloseEdit} centered size='lg'>
                                <Modal.Header closeButton className='bg-warning p-4'>
                                    <Modal.Title>Edit Task</Modal.Title>
                                </Modal.Header>

                                <Form onSubmit={updateTask}>
                                    <Modal.Body className='p-3'>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Task Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Task Name"
                                                value={editTask.taskName}
                                                onChange={(e) => setEditTask({ ...editTask, taskName: e.target.value })}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Task Description</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={4}
                                                placeholder="Task Description"
                                                value={editTask.taskDescription}
                                                onChange={(e) => setEditTask({ ...editTask, taskDescription: e.target.value })}
                                                required
                                            />
                                        </Form.Group>
                                    </Modal.Body>

                                    <Modal.Footer>
                                        <Button variant="secondary" className='rounded-pill px-4' onClick={handleCloseEdit}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" variant="success" className='rounded-pill px-4'>
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal>

                            {/* MODAL FOR EDITING TASK END */}
                        </>
                    ))
                }
            </Row>
        </>
    )
}
