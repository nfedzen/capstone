import React, { Component } from 'react'

import PlayerForm from './PlayerForm'

class LoginPage extends Component {



  render(){
    return (
      <section>
        <h1>Welcome to The Pregame</h1>
        <PlayerForm history={this.props.history} addPlayer={this.props.addPlayer} />
      </section>
    );
  }
}

export default LoginPage;