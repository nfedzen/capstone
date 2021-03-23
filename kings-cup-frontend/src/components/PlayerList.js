import React from 'react'

export default function PlayerList(props){

  function showPlayers() {
    return props.players.map(player => <li className={player.isTurn ? 'players' : 'players-turn'} key={player.userId}>{player.userId}</li>)
  }

  return(
    <div>
      <ol>{showPlayers()}</ol>
    </div>
  )
}