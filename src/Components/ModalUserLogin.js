import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

function ModalUserLogin(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const login = () => {
        hideAndReset();
        props.Login(username, password)
    }

    const register = () => {
        hideAndReset();
        props.Register(username, password)
    }

    const HideWithoutSave = () => {
        hideAndReset()
        props.HandleClose()
    }

    const hideAndReset = () => {
        setUsername("")
        setPassword("")
    }

    return (
        <Modal show={props.Show} onHide={HideWithoutSave}>
            <Modal.Header closeButton>
                <Modal.Title>{props.Title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            placeholder="Enter Username"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your username with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control placeholder="Enter Password" 
                            autoFocus
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={HideWithoutSave}>
                    Close
                </Button>
                <Button variant="dark" onClick={login}>
                    Login
                </Button>
                <Button variant="dark" onClick={register}>
                    Register
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalUserLogin;