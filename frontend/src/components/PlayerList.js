import React from "react";

export default function PlayerList({socket, history, canPopped, loser, players}) {
  function showPlayers() {
    console.log(players)
    return players.map((player) => (
      <li
        className={player.isTurn ? "players" : "players-turn"}
        key={player.socketId}
      >
        {player.userId}
      </li>
    ));
  }

  function handleClick() {
    console.log(socket);
    socket.emit("remove-player", socket.id);
    history.push("/");
  }

  return (
    <div className="form">
      {canPopped ? (
        <li className="players">{loser}</li>
      ) : (
        <ol>{showPlayers()}</ol>
      )}
      <button className="button1" onClick={() => handleClick()}>
        Home
      </button>
    </div>
  );
}
