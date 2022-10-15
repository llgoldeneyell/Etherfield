import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function ModalNewGame(props) {
    const [name, setName] = useState("")

    const saveCard = () => {
        hideAndReset();
        props.SaveAndClose(name)
    }

    const HideWithoutSave = () => {
        hideAndReset()
        props.HandleClose()
    }

    const hideAndReset = () => {
        setName("")
    }

  return (
    <Modal show={props.Show} onHide={HideWithoutSave}>
        <Modal.Header closeButton>
            <Modal.Title>{props.Title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Card Name</Form.Label>
                    <Form.Control
                        placeholder="Game Name"
                        autoFocus
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="dark" onClick={HideWithoutSave}>
                Close
            </Button>
            <Button variant="dark" onClick={saveCard}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
  );
}

export default ModalNewGame;