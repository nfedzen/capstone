import React from "react";
import Card from "./Card";

export default function CardCollection({
  roomCode,
  canPopped,
  deck,
  findAction,
  socket,
  players,
  nextPlayersTurn,
}) {
  function showDeck() {
    return deck.map((card) => (
      <Card
        roomCode={roomCode}
        canPopped={canPopped}
        key={card.code}
        card={card}
        findAction={findAction}
        nextPlayersTurn={nextPlayersTurn}
        players={players}
        socket={socket}
      />
    ));
  }

  return <div className="card-container">{showDeck()}</div>;
}
