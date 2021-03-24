import React from 'react'

export default function PlayerList(props){

  function showPlayers() {
    return props.players.map(player => <li className={player.isTurn ? 'players' : 'players-turn'} key={player.userId}>{player.userId}</li>)
  }

  function loser() {

  }
  return(
    <div>
      {props.canPopped ?
        <li className='players'>{props.loser}</li>
        :<ol>{showPlayers()}</ol>
      }
      
    </div>
  )
}