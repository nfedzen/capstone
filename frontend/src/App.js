import React, { useState } from "react";
import KingsCup from "./components/KingsCup";
import LoginPage from "./components/LoginPage";
import CreateJoinPage from "./components/CreateJoinPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GamesPage from "./components/GamesPage";

export default function App() {
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");

  function addPlayer(player) {
    setPlayerName(player);
  }

  function addRoomCode(code) {
    setRoomCode(code);
  }

  return (
    <Router>
      <Route
        exact
        path="/"
        component={(props) => (
          <LoginPage history={props.history} addPlayer={addPlayer} />
        )}
      />
      <Route
        path="/KingsCup"
        component={(props) => (
          <KingsCup
            history={props.history}
            name={playerName}
            roomCode={roomCode}
          />
        )}
      />
      <Route
        path="/CreateJoin"
        component={(props) => (
          <CreateJoinPage history={props.history} addRoomCode={addRoomCode} />
        )}
      />
      <Route
        path="/GamesPage"
        component={(props) => <GamesPage history={props.history} />}
      />
    </Router>
  );
}
