import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import FreeSpiritDreamer from '../Images/FreeSpiritDreamer.png';
import GamblerDreamer from '../Images/GamblerDreamer.png';
import SpecialistDreamer from '../Images/SpecialistDreamer.png';
import ToughGuyDreamer from '../Images/ToughGuyDreamer.png';
import SlumberDeck from '../Images/SlumberDeck.png';
import SlumberMap from '../Images/SlumberMap.png';
import ModalUserLogin from './ModalUserLogin';
import ModalMessage from './ModalMessage';

function NavigationBar(props) {
    const [modalShow, setModalShow] = useState(false);
    const [postMessage, setPostMessage] = useState("");
    const [modalErrorShow, setModalErrorShow] = useState(false);

    const handleErrorClose = () => setModalErrorShow(false);

    const handleClose = () => {
        setModalShow(false);
    }

    useEffect(() => {
        if (postMessage.toString().includes('Error')) {
            setModalErrorShow(true)
        }

    }, [postMessage])



    useEffect(() => {
        if (!modalErrorShow) {
            setPostMessage("")
        }

    }, [modalErrorShow])


    const login = (username, password) => {

        if (username.trim().length === 0) {
            setModalShow(false)
            setPostMessage("Error: username is null or only white space")
            return
        }

        if (password.trim().length === 0) {
            setModalShow(false)
            setPostMessage("Error: password is null or only white space")
            return
        }

        setModalShow(false)

        const linkApiLogin = props.LinkApi + "User/Login?username=" + username + "&password=" + password;

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        console.log("StoLoggando")

        fetch(linkApiLogin, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.toString().includes('Error')){
                    setPostMessage(data)
                }
                else if (data !== null && parseInt(data) >= 0){
                    window.sessionStorage.setItem("userIndex", data);
                    window.sessionStorage.setItem("userName", username);
                    window.sessionStorage.setItem("gameIndex", -1)
                    props.handleLogin()
                }
                
            });

    }

    const register = (username, password) => {

        if (username.trim().length === 0) {
            setModalShow(false)
            setPostMessage("Error: username is null or only white space")
            return
        }

        if (password.trim().length === 0) {
            setModalShow(false)
            setPostMessage("Error: password is null or only white space")
            return
        }

        const linkApiLogin = props.LinkApi + "/User/AddUser?username=" + username + "&password=" + password;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(linkApiLogin, requestOptions)
            .then(response => response.json())
            .then(data => {
                setPostMessage(data)
            });
    }

    const characters = [
        { Name: "Free Spirit", ImageSrc: FreeSpiritDreamer },
        { Name: "Gambler", ImageSrc: GamblerDreamer },
        { Name: "Specialist", ImageSrc: SpecialistDreamer },
        { Name: "Tough Guy", ImageSrc: ToughGuyDreamer }
    ];

    const dropdownCharactersMenu = characters.map((character) =>
        <NavDropdown.Item href={"/" + character.Name.replace(/ /g, '').toLowerCase()} key={character.Name}>
            {character.Name}
        </NavDropdown.Item>
    );


    const slumbers = [
        { Name: "Slumber Deck", ImageSrc: SlumberDeck },
        { Name: "Slumber Map", ImageSrc: SlumberMap }
    ];
    const dropdownSlumbersMenu = slumbers.map((slumber) =>
        <NavDropdown.Item href={"/" + slumber.Name.replace(/ /g, '').toLowerCase()} key={slumber.Name} disabled={!props.GameLoaded}>
            {slumber.Name}
        </NavDropdown.Item>
    );

    return (
        <Navbar bg="dark" variant="dark" expand="lg" >
            <Container className="mx-5" fluid >
                <Navbar.Brand href="/">{props.Title}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => setModalShow(true)}>Login</Nav.Link>
                        <ModalUserLogin Title="Login" Show={modalShow} Login={login} Register={register} HandleClose={handleClose} />
                        <NavDropdown title="Characters" id="basic-nav-dropdown" disabled={!props.GameLoaded}>
                            {dropdownCharactersMenu}
                        </NavDropdown>
                        <NavDropdown title="Slumber" id="basic-nav-dropdown" disabled={!props.GameLoaded}>
                            {dropdownSlumbersMenu}
                        </NavDropdown>
                        <Nav.Link href="/Gate" disabled={!props.GameLoaded}>Gate</Nav.Link>
                        <Nav.Link href="/Storage" disabled={!props.GameLoaded}>Storage</Nav.Link>
                        <Nav.Link href="/Wisdom" disabled={!props.GameLoaded}>Wisdom</Nav.Link>
                        <Nav.Link href="/Fate" disabled={!props.GameLoaded}>Fate</Nav.Link>
                        <Nav.Link href="/Flaw" disabled={!props.GameLoaded}>Flaw</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <ModalMessage Title="Error" Content={postMessage} Show={modalErrorShow} HandleClose={handleErrorClose} />
        </Navbar>


    );
}

export default NavigationBar;