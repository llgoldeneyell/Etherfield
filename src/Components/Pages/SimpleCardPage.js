import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Col, Row } from 'react-bootstrap';
import ModalAddSimpleCard from '../ModalAddSimpleCard';

function SimpleCardPage(props) {

  const [modalShow, setModalShow] = useState(false);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [changeCardCheck, setChangeCardCheck] = useState(false);
  const [character, setCharacter] = useState();
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
      setUserIndex(window.sessionStorage.getItem("userIndex"));
      setChangeCardCheck(false)
      setCardIndexDelete(-1)
    }

    if (props.GameIndex >= 0 && userIndex >= 0 && props.CharIndex >= 0) {
      const linkApiGetCards = props.LinkApi + "CardList?characterIndex=" + props.CharIndex + "&userIndex=" + userIndex + "&gameIndex=" + props.GameIndex

      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };

      fetch(linkApiGetCards, requestOptions)
        .then(response => response.json())
        .then(data => setCharacter(data));
    }



  }, [changeCardCheck, props.GameIndex, userIndex, props.CharIndex, props.LinkApi])

  useEffect(() => {
    if (character !== undefined) {
      setApiLoaded(true)
    }

  }, [character])

  useEffect(() => {
    if (!apiLoaded) {
      setCharacter(undefined)
    }
  }, [apiLoaded])

  useEffect(() => {
    if (cardIndexDelete !== -1) {
      const linkApiDeleteCard = props.LinkApi + "RemoveCard?characterIndex=" + userIndex + "&gameIndex=" + props.GameIndex + "&characterIndex=" + props.CharIndex +
        "&cardIndex=" + cardIndexDelete

      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      };

      fetch(linkApiDeleteCard, requestOptions)
        .then(response => response.json())
        .then(data => setChangeCardCheck(true));
    }
  }, [cardIndexDelete, userIndex, props.CharIndex, props.GameIndex, props.LinkApi])

  const loadCardList = (() => {
    if (apiLoaded) {
      return (
        character.cardList.map((card, index) => (
          <Col key={index}>
            <Card >
              <Card.Body >
                <Card.Title>{card.name}</Card.Title>
                <Card.Text>
                  {"Type: " + card.type}
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

  const loadTitleCharacter = (() => {
    if (apiLoaded) {
      return (
        <Card.Body>
          <Card.Title>{character.name}</Card.Title>
          <Card.Title>{"(" + character.playerName + ")"}</Card.Title>
          <Card.Text>{character.description}</Card.Text>
          <Button variant="dark" onClick={() => setModalShow(true)}>Set Player</Button>
          <Button variant="dark" onClick={() => setModalShow(true)}>Add a Card</Button>
          <ModalAddSimpleCard Title="Add a Character Card" OptionValues={props.OptionValues} Show={modalShow} SaveAndClose={saveAndClose} HandleClose={handleClose} />
        </Card.Body>
      )
    }
    else {
      return (<Card.Body>
        <Card.Title></Card.Title>
        <Card.Text></Card.Text>
        <Button variant="dark" onClick={() => setModalShow(true)}>Add a Card</Button>
        <ModalAddSimpleCard Title="Add a Character Card" OptionValues={props.OptionValues} Show={modalShow} SaveAndClose={saveAndClose} HandleClose={handleClose} />
      </Card.Body>)
    }
  });

  const saveAndClose = (name, type, text) => {

    const jsonData = {
      "Name": name,
      "Type": type,
      "Text": text
    }

    console.log(jsonData)

    setModalShow(false)
    console.log("Prima del link: " + props.GameIndex)

    const linkApiPostCard = props.LinkApi + "AddCard?userIndex=" + userIndex + "&gameIndex=" + props.GameIndex + "&characterIndex=" + props.CharIndex;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonData)
    };

    console.log("Prima del save: " + props.GameIndex)

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
            {loadTitleCharacter()}
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

export default SimpleCardPage;