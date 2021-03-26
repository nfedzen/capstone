import React, { Component } from 'react'
import PlayerForm from './PlayerForm'

class LoginPage extends Component {

  state = {
    playerName: ''
  }

  addPlayer = (player) => {
    this.setState({
      playerName: player
    })
  }


  render(){
    return (
      <section>
        <h1>Welcome to The Pregame</h1>
        <PlayerForm addPlayer={this.addPlayer} />
      </section>
    );
  }
}

export default LoginPage;