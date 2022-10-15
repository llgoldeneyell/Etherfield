import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Col, Row } from 'react-bootstrap';
import ModalAddTileCard from '../ModalAddTileCard';

function SimpleTilePage(props) {

  const [modalShow, setModalShow] = useState(false);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [changeCardCheck, setChangeCardCheck] = useState(false);
  const [cardIndexDelete, setCardIndexDelete] = useState(-1);

  const [cardList, setCardList] = useState();
  const [userIndex, setUserIndex] = useState(-1);

  const handleClose = () => setModalShow(false);

  // Called when App.js change the game index, when game index is not -1 take userIndex
  // If game index != -1 it's sure that user is already logged
  useEffect(() => {
    if (props.GameIndex >= 0) {
      setUserIndex(window.sessionStorage.getItem("userIndex"));
    }
  }, [props.GameIndex])

  // Refresh and get the list of the card from backend and set the card list
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
        .then(data => setCardList(data));
    }
  }, [changeCardCheck, props.GameIndex, userIndex, props.LinkApi])

  // Refresh when cardlist is updated and if is != undefined then put apiLoaded to true
  useEffect(() => {
    if (cardList !== undefined) {
      setApiLoaded(true)
    }

  }, [cardList])


  // Refresh when apiLoaded is updated, if is false set cardList to undefined
  useEffect(() => {
    if (!apiLoaded) {
      setCardList(undefined)
    }
  }, [apiLoaded])

  // Refresh and delete card with index cardIndexDelete, after this setChangeCardCheck so can set cardIndexDelete to -1 and refresh card list
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
  }, [cardIndexDelete, userIndex, props.LinkApi, props.GameIndex])

  // Method to create Card for every element in cardList
  // the list of Card will be created only if apiLoaded is true
  // The Delete button set cardIndexDelete to the index of the element, this call the useEffect to delete card and refresh
  const loadCardList = (() => {
    if (apiLoaded) {
      return (
        cardList.map((card, index) => (
          <Col key={index}>
            <Card>
              <Card.Body>
                <Card.Title>{card.name}</Card.Title>
                <Card.Text>
                  {"Code: " + card.code}
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

  // method passed to ModalAddTileCard to save a new card when push Save Changes  button on Modal
  const saveAndClose = (name, code) => {

    const jsonData = {
      "Name": name,
      "Code": code
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
              <ModalAddTileCard Title={"Add " + props.Title + " Card"} Show={modalShow} SaveAndClose={saveAndClose} HandleClose={handleClose} />
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

export default SimpleTilePage;