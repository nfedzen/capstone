import React, { Component } from 'react'
import KingsCup from './components/KingsCup'
import LoginPage from './components/LoginPage'
import CreateJoinPage from './components/CreateJoinPage'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GamesPage from './components/GamesPage'



class App extends Component {

  state = {
    playerName: '',
    roomCode:''
  }

  addPlayer = (player) => {
    this.setState({
      playerName: player
    })
  }

  addRoomCode = (code) => {
    console.log(code)
    this.setState({
      roomCode: code
    })
  }
  
  render(){
    return (
      <Router>
        <Route exact path="/" component={(props) => <LoginPage history={props.history} addPlayer={this.addPlayer} />} />
        <Route path="/KingsCup" component={(props) => <KingsCup history={props.history} name={this.state.playerName} roomCode={this.state.roomCode} />} />
        <Route path="/CreateJoin" component={(props) => <CreateJoinPage history={props.history} addRoomCode={this.addRoomCode} />} />
        <Route path="/GamesPage" component={(props) => <GamesPage history={props.history} />}/>
      </Router>
    );
  }
}

export default App;
