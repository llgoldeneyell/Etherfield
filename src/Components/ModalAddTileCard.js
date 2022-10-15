import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function ModalAddTileCard(props) {


    const [name, setName] = useState("")
    const [romanNumber, setRomanNumber] = useState("I")
    const [number, setNumber] = useState(1)
    const [letter, setLetter] = useState("A")

    const saveCard = () => {
        const code = romanNumber + "-" + number + " " + letter
        hideAndReset();
        props.SaveAndClose(name, code)
    }

    const HideWithoutSave = () => {
        hideAndReset()
        props.HandleClose()
    }

    const hideAndReset = () => {
        setName("")
        setRomanNumber("I");
        setNumber(1);
        setLetter("A");
    }


    const romanNumbers = ["I", "II", "III", "IV", "V"]

    const romanNumberOptions = romanNumbers.map((romanNumber) => (
        <option key={romanNumber} value={romanNumber}>{romanNumber}</option>
    ));

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const numberOptions = numbers.map((number) => (
        <option key={number} value={number}>{number}</option>
    ));

    const letters = ["A", "B", "C", "D", "E", "F", "G", "H"]

    const letterOptions = letters.map((letter) => (
        <option key={letter} value={letter}>{letter}</option>
    ));

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
                            placeholder="Card Name"
                            autoFocus
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Roman Number</Form.Label>
                                <Form.Select onChange={(e) => setRomanNumber(e.target.value)}>
                                    {romanNumberOptions}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Number</Form.Label>
                                <Form.Select onChange={(e) => setNumber(e.target.value)}>
                                    {numberOptions}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label onChange={(e) => setLetter(e.target.value)}>
                                    Letter
                                </Form.Label >
                                <Form.Select>
                                    {letterOptions}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={HideWithoutSave}>
                    Close
                </Button>
                <Button variant="primary" onClick={saveCard}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalAddTileCard;