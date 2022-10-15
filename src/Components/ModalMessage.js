import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalMessage(props) {

    return (
        <Modal show={props.Show} onHide={props.HandleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.Title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{props.Content}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={props.HandleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalMessage;