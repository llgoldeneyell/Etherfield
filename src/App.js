import React, { useState, useEffect } from 'react';
import NavigationBar from './Components/NavigationBar';


import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";

// Import Page
import Home from './Components/Pages/Home';
import SimpleTilePage from './Components/Pages/SimpleTilePage';
import SimpleCodeCardPage from './Components/Pages/SimpleCodeCardPage';
import SimpleCardPage from './Components/Pages/SimpleCardPage';

// Import all image
import EtherfieldsImg from './Images/Etherfields.png';
import FreeSpiritDreamer from './Images/FreeSpiritDreamer.png';
import GamblerDreamer from './Images/GamblerDreamer.png';
import SpecialistDreamer from './Images/SpecialistDreamer.png';
import ToughGuyDreamer from './Images/ToughGuyDreamer.png';
import StorageImg from './Images/Storage.jpg';
import GateImg from './Images/Gate.jpg';
import FateImg from './Images/Fate.jpg';
import SlumberDeck from './Images/SlumberDeck.png';
import SlumberMap from './Images/SlumberMap.png';

function App() {
  const [logged, setLogged] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [gameIndex, setGameIndex] = useState(-1);

  // Method passed to Navigation bar, is called when user make the login 
  const loggedCheck = () => {
    console.log("ho loggato")
    setLogged(true)
    window.sessionStorage.setItem("logged", true)
  }

  // Take game index from session variable and set to gameIndex, gameIndex is used from the Character page
  const gameLoadedCheck = () => {
    setGameIndex(window.sessionStorage.getItem("gameIndex"))
    setLoaded(true)
  }

  // Refresh when gameIndex change and setLoaded to false when is -1
  useEffect(() => {
    if (gameIndex === -1) setLoaded(false)

  }, [gameIndex])

  // at the start set logged and gameindex
  useEffect(() => {
    setLogged(window.sessionStorage.getItem("logged"))
    setGameIndex(window.sessionStorage.getItem("gameIndex"))

  }, [])

  const optionStorageValues = [
    {Name: "Item"},
    {Name: "Note"}
  ];

  const optionCharacterValues = [
    {Name: "Influence"},
    {Name: "Mask"}
  ];

  const characters = [
    { Name: "Free Spirit", ImageSrc: FreeSpiritDreamer },
    { Name: "Gambler", ImageSrc: GamblerDreamer },
    { Name: "Specialist", ImageSrc: SpecialistDreamer },
    { Name: "Tough Guy", ImageSrc: ToughGuyDreamer }
  ];


  const slumbers = [
    { Name: "Slumber Deck", ImageSrc: SlumberDeck, Description: "Text Description Slumber Deck", LinkApi: "https://etherfieldbackend.azurewebsites.net/Slumber/Deck/" },
    { Name: "Slumber Map", ImageSrc: SlumberMap, Description: "Text Description Slumber Map", LinkApi: "https://etherfieldbackend.azurewebsites.net/Slumber/Map/" }
  ];


  const dropdownSlumbersRoute = slumbers.map((slumber) =>
    <Route path={"/" + slumber.Name.replace(/ /g, '').toLowerCase()} element={<SimpleTilePage Title={slumber.Name} ImageSrc={slumber.ImageSrc} Description={slumber.Description}
      LinkApi={slumber.LinkApi} GameIndex={gameIndex}/>} key={slumber.Name} />
  );


  const dropdownCharactersRoute = characters.map((character, index) =>
    <Route path={"/" + character.Name.replace(/ /g, '').toLowerCase()} element={
      <SimpleCardPage Title={character.Name} ImageSrc={character.ImageSrc} OptionValues={optionCharacterValues}
        LinkApi={"https://etherfieldbackend.azurewebsites.net/Character/"} CharIndex={index} GameIndex={gameIndex} />
    } key={index}>
    </Route>
  );

  return (
    <>
      <BrowserRouter>
        <NavigationBar Title="Etherfields" LinkApi={"https://etherfieldbackend.azurewebsites.net/"} handleLogin={loggedCheck} GameLoaded={logged && gameIndex >= 0} />

        <Routes>
          <Route path='/' element={<Home Logged={logged} Title="Home Page" Description="Create or load previous game" LinkApi={"https://etherfieldbackend.azurewebsites.net/"}
          ImageSrc={EtherfieldsImg} GameLoadedCheck={gameLoadedCheck} Loaded={loaded} />} />
          {dropdownCharactersRoute}
          {dropdownSlumbersRoute}
          <Route path='/Gate' diabled={gameIndex === -1} element={
            <SimpleTilePage Title="Gate" Description="Gate List" ImageSrc={GateImg} LinkApi="https://etherfieldbackend.azurewebsites.net/Gate/"
              GameLoadedCheck={gameLoadedCheck} Logged={logged} GameIndex={gameIndex}/>
          } />
          <Route path='/Storage' element={<SimpleCodeCardPage Logged={logged} Title="Storage" Description="Storage for team's items" ImageSrc={StorageImg} GameLoadedCheck={gameLoadedCheck}
            GameIndex={gameIndex} LinkApi="https://etherfieldbackend.azurewebsites.net/Storage/" diabled={gameIndex === -1} OptionValues={optionStorageValues}/>} />
          <Route path='/Wisdom' element={<SimpleTilePage Logged={logged} Title="Wisdom" Description="Wisdom List" ImageSrc={StorageImg} GameLoadedCheck={gameLoadedCheck}
            GameIndex={gameIndex} LinkApi="https://etherfieldbackend.azurewebsites.net/Wisdom/" diabled={gameIndex === -1} />} />
          <Route path='/Fate' element={<SimpleTilePage Logged={logged} Title="Fate" Description="Fate List" ImageSrc={FateImg} GameLoadedCheck={gameLoadedCheck}
            GameIndex={gameIndex} LinkApi="https://etherfieldbackend.azurewebsites.net/Fate/" />} diabled={gameIndex === -1} />
          <Route path='/Flaw' element={<SimpleTilePage Logged={logged} Title="Flaw" Description="Flaw List" ImageSrc={StorageImg} GameLoadedCheck={gameLoadedCheck}
            GameIndex={gameIndex} LinkApi="https://etherfieldbackend.azurewebsites.net/Flaw/" />} diabled={gameIndex === -1} />
        </Routes>

      </BrowserRouter>


    </>

  );
}

export default App;
