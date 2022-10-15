import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function ModalAddSimpleCard(props) {
    const [name, setName] = useState("")
    const [type, setType] = useState("Prova")
    const [text, setText] = useState("")

    const saveCard = () => {
        hideAndReset();
        props.SaveAndClose(name, type, text)
    }

    const HideWithoutSave = () => {
        hideAndReset()
        props.HandleClose()
    }

    const hideAndReset = () => {
        setName("")
        setType(props.OptionValues[0].Name)
        setText("");
    }

    useEffect(() => {
        setType(props.OptionValues[0].Name)
    }, [props.OptionValues])

    // const optionList = (() => {
    //     if (props.OptionValues.length > 0) {
    //         return (
    //             props.OptionValues.map((option) =>
    //                 <option key={option.Name} value={option.Name}>{option.Name}</option>
    //             )
    //         )
    //     }
    // });

    const optionList = props.OptionValues.map((option) =>
        <option key={option.Name} value={option.Name}>{option.Name}</option>
    );

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
                    <Form.Group className="mb-3">
                        <Form.Label>Type of Card</Form.Label>
                        <Form.Select onChange={(e) => setType(e.target.value)}>
                            {optionList}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
                        <Form.Label>Card Text</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={(e) => setText(e.target.value)} />
                    </Form.Group>
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

export default ModalAddSimpleCard;