import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Col, Row } from 'react-bootstrap';
import ModalAddCodeCard from '../ModalAddCodeCard';

function SimpleCodeCardPage(props) {

    const [modalShow, setModalShow] = useState(false);
    const [apiLoaded, setApiLoaded] = useState(false);
    const [changeCardCheck, setChangeCardCheck] = useState(false);
    const [storage, setStorage] = useState();
    const [cardIndexDelete, setCardIndexDelete] = useState(-1);
    const [userIndex, setUserIndex] = useState(-1);

    const handleClose = () => setModalShow(false);

    useEffect(() => {
        if (props.GameIndex >= 0) {
            setUserIndex(window.sessionStorage.getItem("userIndex"));
        }
    }, [props.GameIndex])

    useEffect(() => {
        if (changeCardCheck) {
            setChangeCardCheck(false)
            setCardIndexDelete(-1)
        }

        if (props.GameIndex >= 0 && userIndex >= 0) {
            const linkApiGetCards = props.LinkApi + "CardList?userIndex=" + userIndex + "&gameIndex=" + props.GameIndex

            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };

            fetch(linkApiGetCards, requestOptions)
                .then(response => response.json())
                .then(data => setStorage(data));
        }



    }, [changeCardCheck, props.GameIndex, userIndex, props.LinkApi])

    useEffect(() => {
        if (storage !== undefined) {
            setApiLoaded(true)
        }

    }, [storage])

    useEffect(() => {
        if (!apiLoaded) {
            setStorage(undefined)
        }
    }, [apiLoaded])

    useEffect(() => {
        if (cardIndexDelete !== -1) {
            const linkApiDeleteCard = props.LinkApi + "RemoveCard?userIndex=" + userIndex + "&gameIndex=" + props.GameIndex + "&cardIndex=" + cardIndexDelete

            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            };

            fetch(linkApiDeleteCard, requestOptions)
                .then(response => response.json())
                .then(data => setChangeCardCheck(true));
        }
    }, [cardIndexDelete, userIndex, props.GameIndex, props.LinkApi])

    const loadCardList = (() => {
        if (apiLoaded) {
            return (
                storage.map((card, index) => (
                    <Col key={index}>
                        <Card >
                            <Card.Body >
                                <Card.Title>{card.name}</Card.Title>
                                <Card.Text>
                                    {"Type: " + card.type}
                                </Card.Text>
                                <Card.Text>
                                    {"Code: " + card.code}
                                </Card.Text>
                                <Card.Text>{card.text}
                                </Card.Text>
                                <Button variant="dark" onClick={() => setCardIndexDelete(index)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
            )
        }
        else {
            return (<div />)
        }
    });

    const saveAndClose = (name, type, code, text) => {

        const jsonData = {
            "Name": name,
            "Type": type,
            "Code": code,
            "Text": text
        }

        setModalShow(false)

        const linkApiPostCard = props.LinkApi + "AddCard?userIndex=" + userIndex + "&gameIndex=" + props.GameIndex;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData)
        };

        fetch(linkApiPostCard, requestOptions)
            .then(response => response.json())
            .then(data => setChangeCardCheck(true));

    }

    return (

        <Container fluid>
            <Row>
                <Col className='m-2 d-flex justify-content-center' md="auto">
                    <Card style={{ width: '20rem' }}>
                        <Card.Img variant="top" src={props.ImageSrc} />
                        <Card.Body>
                            <Card.Title>{props.Title}</Card.Title>
                            <Card.Text>{props.Description}
                            </Card.Text>
                            <Button variant="dark" onClick={() => setModalShow(true)}>Add a Card</Button>
                            <ModalAddCodeCard Title="Add a Storage Card" OptionValues={props.OptionValues} Show={modalShow} SaveAndClose={saveAndClose} HandleClose={handleClose} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col className='m-2'>
                    <Row xs={1} md={3} className="g-4">
                        {loadCardList()}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default SimpleCodeCardPage;