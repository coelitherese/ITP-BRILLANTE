import { use } from 'react';
import { useAuth } from '../AuthContext';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


export default function ProfilePage() {
    const { user, setUser } = useAuth();
    const [showEdit, setShowEdit] = useState(false);

    const navigate = useNavigate();

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwords, setPasswords] = useState({
        current: "",
        newPass: "",
        confirm: ""
    });

    const [passMessage, setPassMessage] = useState({
        message: "",
        css: ""
    });

    const [editProfile, setEditProfile] = useState({
        fname: "",
        mname: "",
        lname: "",
        email: ""
    });

    useEffect(() => {
        document.title = `${user.fname.toUpperCase()} ${user.lname.toUpperCase()} - Profile`
        if (!user) {
            navigate("/login");
        } else {
            setEditProfile({
                fname: user.fname,
                mname: user.mname,
                lname: user.lname,
                email: user.email
            });
        }
    }, [user, navigate]);


    useEffect(() => {
        const { newPass, confirm } = passwords;

        if (newPass.length === 0 && confirm.length === 0) {
            setPassMessage({ message: "", css: "" });
        } else if (newPass.length > 0 && newPass.length < 8) {
            setPassMessage({ message: "Password must be at least 8 characters.", css: "fw-bold text-danger" });
        } else if (newPass !== confirm) {
            setPassMessage({ message: "Passwords do not match.", css: "fw-bold text-warning" });
        } else {
            setPassMessage({ message: "Passwords match.", css: "fw-bold text-success" });
        }
    }, [passwords.newPass, passwords.confirm]);

    if (!user) return null; // Ensure user is defined before rendering



    // Edit Profile Function
    const handleUpdateProfile = () => {
        fetch(`http://localhost:4000/users/update/${user.user_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editProfile)
        })
            .then(res => res.json())
            .then(data => {
                if (data.code === 1) {

                    const updatedUser = {
                        ...user,
                        ...editProfile
                    };
                    setUser(updatedUser);
                    localStorage.setItem("loginData", JSON.stringify(updatedUser));

                    Swal.fire({
                        icon: 'success',
                        title: 'Updated!',
                        text: data.details
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);

                    setShowEdit(false);

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.details
                    });
                }
            });
    };

    // Change Password Function


    const handleChangePassword = () => {
        const { current, newPass, confirm } = passwords;

        // Basic password checks
        if (newPass.length < 8) {
            return Swal.fire("Invalid", "New password must be at least 8 characters long.", "warning");
        }

        if (newPass !== confirm) {
            return Swal.fire("Mismatch", "New passwords do not match.", "warning");
        }

        // Confirm action
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to update your password?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ffc107',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, update it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:4000/users/change-password/${user.user_id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        currentPassword: current,
                        newPassword: newPass
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.code === 1) {
                            Swal.fire("Updated!", data.details, "success");
                            setShowPasswordModal(false);
                            setPasswords({ current: "", newPass: "", confirm: "" });
                        } else {
                            Swal.fire("Error", data.details, "error");
                        }
                    });
            } else {
                // Clear fields if user cancels
                setPasswords({ current: "", newPass: "", confirm: "" });
            }
        });
    };




    return (
        <Container fluid className="min-vh-100 bg-light d-flex align-items-center justify-content-center py-5">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={4} className="text-center mb-4 mb-md-0 border-md-end pe-md-4">
                        <img
                            src={`https://ui-avatars.com/api/?name=${user.fname}+${user.lname}&background=343a40&color=fff&bold=true`}
                            alt="Profile"
                            className="rounded-circle border border-4 border-warning"
                            style={{ width: '160px', height: '160px' }}
                        />
                    </Col>

                    <Col xs={12} md={8} className="ps-md-4">
                        <h2 className="fw-bold mb-2">{user.fname} {user.lname}</h2>
                        <p className="text-muted fs-5 mb-3">{user.email}</p>

                        <hr className="my-4" />

                        <Form>
                            <Form.Group as={Row} className="mb-4">
                                <Form.Label column sm={4} className="text-muted fw-semibold fs-6">
                                    Full Name
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control
                                        plaintext
                                        readOnly
                                        defaultValue={`${user.fname} ${user.mname} ${user.lname}`}
                                        className="fs-5"
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-4">
                                <Form.Label column sm={4} className="text-muted fw-semibold fs-6">
                                    Email
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control plaintext readOnly defaultValue={user.email} className="fs-5" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm={4} className="text-muted fw-semibold fs-6">
                                    User ID
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control plaintext readOnly defaultValue={user.user_id} className="fs-5" />
                                </Col>
                            </Form.Group>
                        </Form>

                        <Row className="mt-4">
                            <Col xs="auto">
                                <Button
                                    variant="outline-dark"
                                    className="me-2 px-4 py-2"
                                    onClick={() => {
                                        setEditProfile({
                                            fname: user.fname,
                                            mname: user.mname,
                                            lname: user.lname,
                                            email: user.email
                                        });
                                        setShowEdit(true);
                                    }}
                                >
                                    Edit Profile
                                </Button>
                            </Col>
                            <Col xs="auto">
                                <Button variant="warning" onClick={() => setShowPasswordModal(true)}>
                                    Change Password
                                </Button>

                            </Col>
                        </Row>
                    </Col>
                </Row>

                {/* Edit Modal */}
                <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
                    <Modal.Header closeButton className="bg-dark text-white">
                        <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdateProfile();
                    }}>
                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editProfile.fname}
                                    onChange={(e) => setEditProfile({ ...editProfile, fname: e.target.value })}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Middle Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editProfile.mname}
                                    onChange={(e) => setEditProfile({ ...editProfile, mname: e.target.value })}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editProfile.lname}
                                    onChange={(e) => setEditProfile({ ...editProfile, lname: e.target.value })}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={editProfile.email}
                                    onChange={(e) => setEditProfile({ ...editProfile, email: e.target.value })}
                                    required
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowEdit(false)}>Cancel</Button>
                            <Button variant="warning" type="submit">Save Changes</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
                <Modal
                    show={showPasswordModal}
                    onHide={() => {
                        setShowPasswordModal(false);
                        setPasswords({ current: "", newPass: "", confirm: "" });
                    }}
                    centered
                >
                    <Modal.Header closeButton className="bg-dark text-white">
                        <Modal.Title>Change Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={passwords.current}
                                onChange={e => setPasswords({ ...passwords, current: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Set New Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={passwords.newPass}
                                onChange={e => setPasswords({ ...passwords, newPass: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={passwords.confirm}
                                onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <p className={`mt-2 ${passMessage.css}`}>{passMessage.message}</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setShowPasswordModal(false);
                                setPasswords({ current: "", newPass: "", confirm: "" });
                            }}
                        >
                            Cancel
                        </Button>

                        <Button variant="warning" onClick={handleChangePassword}>Update Password</Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        </Container>
    );
}
