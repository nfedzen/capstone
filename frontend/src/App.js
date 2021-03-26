import React, { Component } from 'react'
import KingsCup from './components/KingsCup'
import LoginPage from './components/LoginPage'
import CreateJoinPage from './components/CreateJoinPage'
import KingsGameLobby from './components/KingsGameLobby'
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';



class App extends Component {

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
      <Router>
        <Route exact path="/" component={(props) => <LoginPage history={props.history} addPlayer={this.addPlayer} />} />
        <Route path="/KingsCup" component={(props) => <KingsCup name={this.state.playerName} />} />
        <Route path="/CreateJoin" component={CreateJoinPage} />
        <Route path="/KingsGameLobby" component={KingsGameLobby} />
        
      </Router>
    );
  }
}

export default App;




// const App = () => (
//   <Router>
//     <Route exact path="/" component={LoginPage} />
//     <Route path="/KingsCup" component={KingsCup} />
//   </Router>
// );

// render(<App />, document.getElementById('root'));

// export default App;