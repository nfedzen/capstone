import React, { Component } from 'react'

import PlayerForm from './PlayerForm'

class LoginPage extends Component {



  render(){
    return (
      <section>
        <div className='action-bar'>
        </div>
        <div className='form'>
            <h1>Welcome to The Pregame</h1>
          <PlayerForm history={this.props.history} addPlayer={this.props.addPlayer} />
        </div>
      </section>
    );
  }
}

export default LoginPage;