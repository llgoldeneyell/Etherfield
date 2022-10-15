import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Button, Alert, Card, ButtonGroup } from 'react-bootstrap';
import ModalMessage from '../ModalMessage';
import ModalNewGame from '../ModalNewGame';

function Home(props) {

  const [userIndex, setUserIndex] = useState(-1);
  const [userName, setUserName] = useState("");

  const [modalShow, setModalShow] = useState(false);
  const [modalErrorShow, setModalErrorShow] = useState(false);
  const [postMessage, setPostMessage] = useState("");
  const [gameName, setGameName] = useState("");
  const [alertName, setAlertName] = useState("");

  const [gameList, setGameList] = useState([]);
  const [checkLoad, setCheckLoad] = useState(false);
  const [checkAlert, setCheckAlert] = useState(false);

  const handleClose = () => {
    setModalShow(false);
  }
  const handleErrorClose = () => setModalErrorShow(false);

  useEffect(() => {
    if (props.Logged) {
      setUserIndex(window.sessionStorage.getItem("userIndex"));
      setUserName(window.sessionStorage.getItem("userName"));
      setCheckAlert(true)
      setCheckLoad(true)
    }
  }, [props.Logged, props.Loaded])

  useEffect(() => {
    if (checkLoad) {
      if (userIndex >= 0) {
        const linkApiGameLoad = props.LinkApi + "User/Game?userIndex=" + userIndex;

        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        };

        fetch(linkApiGameLoad, requestOptions)
          .then(response => response.json())
          .then(data => {
            if (data.includes('Error')) {
              setPostMessage(data)
            }
            else {
              setGameList(data)
            }
          });
      }
      setCheckLoad(false)
    }
  }, [checkLoad, gameList, userIndex, props.LinkApi])

  useEffect(() => {
    if (postMessage.includes('Error')) {
      setModalErrorShow(true)
    }
    else if (postMessage.includes('Success')) {

      if (gameName.trim().length !== 0) {
        const linkApiGameLoad = props.LinkApi + "User/Game/Loaded?userIndex=" + userIndex + "&gameName=" + gameName;

        setCheckAlert(true)

        window.sessionStorage.setItem("gameName", gameName)

        setGameName("")

        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        };

        fetch(linkApiGameLoad, requestOptions)
          .then(response => response.json())
          .then(data => {
            if (parseInt(data) >= 0) {
              window.sessionStorage.setItem("gameIndex", data)
              props.GameLoadedCheck()
              setPostMessage("")
            }
            else {
              setPostMessage(data)
            }
          }
          );
      }
    }

  }, [gameName, postMessage, userIndex, props])

  useEffect(() => {
    if (!modalErrorShow) {
      setPostMessage("")
      setGameName("")
    }

  }, [modalErrorShow])

  const newGame = (name) => {

    if (name.trim().length === 0) {
      setModalShow(false)
      setPostMessage("Error: name is null or only white space")
      return
    }

    setModalShow(false)

    setGameName(name)

    const linkApiNewGame = props.LinkApi + "User/Game/AddGame?userIndex=" + userIndex + "&fileName=" + name;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };

    fetch(linkApiNewGame, requestOptions)
      .then(response => response.json())
      .then(data => {
        setPostMessage(data)
      }
      );

    setCheckLoad(true)
  }

  // method called by LoadGame DropItem button that take idx of game, save it on a gameIndex variable and pass it to App.js with GameLoadedCheck Method
  const handleItemClick = (name) => {

    const linkApiGameLoad = props.LinkApi + "User/Game/Loaded?userIndex=" + userIndex + "&gameName=" + name;

    window.sessionStorage.setItem("gameName", name)

    setCheckAlert(true)

    setGameName("")

    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    fetch(linkApiGameLoad, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (parseInt(data) >= 0) {
          window.sessionStorage.setItem("gameIndex", data)
          props.GameLoadedCheck()
          setPostMessage("")
        }
        else {
          setPostMessage(data)
        }
      }
      );

    setCheckLoad(true)
    props.GameLoadedCheck()
  }

  const handleItemDelete = (idx, name) => {
    if (window.sessionStorage.getItem("gameName") === name) {
      window.sessionStorage.setItem("gameName", "")
      window.sessionStorage.setItem("gameIndex", -1)
      setCheckAlert(true)
      props.GameLoadedCheck()
    }

    const linkApiDeleteGame = props.LinkApi + "User/Game/DeleteGame?userIndex=" + userIndex + "&gameIndex=" + idx

    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };

    fetch(linkApiDeleteGame, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.includes('Error')) {
          setPostMessage(data)
        }
        else {
          setCheckLoad(true)
        }
      });
  }

  useEffect(() => {
    if (checkAlert) {
      setAlertName(window.sessionStorage.getItem("gameName"));
      setCheckAlert(false)
    }

  }, [checkAlert, alertName])

  const loadLoginAlert = (() => {
    if (userName !== null && userName.length !== 0) {
      return (
        <Alert className='m-2' variant="success">
          {"User: " + userName}
        </Alert>
      )
    }
    else {
      return (
        <Alert className='m-2' variant="danger">
          Please Login
        </Alert>
      )
    }
  });

  const loadGameAlert = (() => {
    if (alertName !== null && alertName.length !== 0) {
      return (
        <Alert className='m-2' variant="success">
          {"Game Loaded: " + alertName}
        </Alert>
      )
    }
    else {
      if (props.Logged) {

        return (
          <Alert className='m-2' variant="warning">
            Game not loaded
          </Alert>
        )
      }
      else {

        return (
          <Alert className='m-2' variant="danger">
            Please Login
          </Alert>
        )
      }
    }
  });

  const loadCardList = (() => {
    if (props.Logged) {
      return (
        gameList.map((game, index) => (
          <Col key={index} >
            <Card>
              <Card.Body>
                <Card.Title>{game.name}</Card.Title>
                <Card.Text>
                  {"Creation date: " + game.creationDate}
                </Card.Text>
                <Card.Text>
                  {"Last save: " + game.lastSave}
                </Card.Text>
                <ButtonGroup aria-label="Basic example">
                  <Button variant="dark" onClick={() => handleItemClick(game.name)} disabled={game.loaded}>{game.loaded ? "Loaded" : "Load"}</Button>
                  <Button variant="dark" onClick={() => handleItemDelete(index, game.name)}>Delete</Button>
                </ButtonGroup>
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

  return (
    <Container fluid>
      <Row>
        <Col>
        {loadLoginAlert()}
        </Col>
        <Col>
          {loadGameAlert()}
        </Col>
      </Row>
      <Row>
        <Col className='m-2 d-flex justify-content-center' md="auto">
          <Card style={{ width: '20rem' }}>
            <Card.Img variant="top" src={props.ImageSrc} />
            <Card.Body>
              <Card.Title>{props.Title}</Card.Title>
              <Card.Text>{props.Description}
              </Card.Text>
              <Button variant="dark" onClick={() => setModalShow(true)}>New Game</Button>
              <ModalNewGame Title="Write the name of the file" Show={modalShow} SaveAndClose={newGame} HandleClose={handleClose} />
            </Card.Body>
          </Card>
        </Col>
        <Col className='m-2'>
          <Row xs={1} md={3} className="g-4">
            {loadCardList()}
          </Row>
        </Col>
      </Row>
      <ModalMessage Title="Error" Content={postMessage} Show={modalErrorShow} HandleClose={handleErrorClose} />
    </Container>
  );
}

export default Home;