import React from "react";

export default function PlayerList(props) {
  function showPlayers() {
    return props.players.map((player) => (
      <li
        className={player.isTurn ? "players" : "players-turn"}
        key={player.socketId}
      >
        {player.userId}
      </li>
    ));
  }

  function handleClick() {
    console.log(props.socket);
    props.socket.emit("remove-player", props.socket.id);
    props.history.push("/");
  }

  return (
    <div className="form">
      {props.canPopped ? (
        <li className="players">{props.loser}</li>
      ) : (
        <ol>{showPlayers()}</ol>
      )}
      <button className="button1" onClick={() => handleClick()}>
        Home
      </button>
    </div>
  );
}
