import React from 'react'

export default function PlayerList(props){

  function showPlayers() {
    return props.players.map(player => <li className={player.isTurn ? 'players' : 'players-turn'} key={player.socketId}>{player.userId}</li>)
  }

  function handleClick() {
    props.history.push('/')
  }

  return(
    <div>
      {props.canPopped ?
        <li className='players'>{props.loser}</li>
        :<ol>{showPlayers()}</ol>
      }
      <button onClick={()=> handleClick()}>Home</button>
    </div>
  )
}