import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import CardCollection from './components/CardCollection'
import BeerCan from './components/BeerCan'
import BeerCanImage from './beerCan2.png'
import './App.css';
import PlayerList from './components/PlayerList'

const popped = 'http://cdn.lowgif.com/small/f6e92d70bc5aabd6-image-beer-explosion-gif-simpsons-wiki-fandom-powered-by-wikia.gif'
const closed = BeerCanImage
const ENDPOINT = 'http://localhost:3003/'
const socket = socketIOClient(ENDPOINT)
const room = "Wooo"

class App extends Component {

  state = {
    action: 'Choose a Card!',
    clicks: 0,
    turn: 0,
    canPopped: false,
    canStatus: closed,
    players: [],
    deck: [],
  }
  
  componentDidMount(){
    const name = prompt('what is your name')
    
    socket.emit('room', room)
    socket.emit('new-player', name)

    socket.on('add-player', players => {
      if(players){
        this.setState({players: players})
      }
    })

    socket.on('update-players', players => {
      if (players) {
        this.setState({players: players})
      }
    })

    socket.on('next-player', message => {
      this.nextPlayersTurn()
    })

    socket.on('populate-deck', newDeck => {
      this.setState({deck: newDeck})
    })

    socket.on('can-pop', id => {
      this.setState({canPopped: true})
      const loser = this.state.players.find(player => player.isTurn === true )
      this.setState({action: `Can Popped! ${loser.userId} finish your drink and start a new game!`})
        
      
    })
  }

  findAction = (cardValue) => {
    if(!this.state.canPopped){
      switch(cardValue) {
        case 'ACE':
          this.setState({action: 'Waterfall'})
          break;
        case "2":
          this.setState({action: 'Pick someone to drink'})
          break;
        case "3":
          this.setState({action: 'Take a drink'})
          break;
        case "4":
          this.setState({action: 'Floor'})
          break;
        case "5":
          this.setState({action: 'Guys'})
          break;
        case "6":
          this.setState({action: 'Chicks'})
          break;
        case "7":
          this.setState({action: 'Heaven'})
          break;
        case "8":
          this.setState({action: 'Date'})
          break;
        case "9":
          this.setState({action: 'Rhyme'})
          break;
        case "10":
          this.setState({action: 'Categories'})
          break;
        case 'JACK':
          this.setState({action: 'Never Have I Ever'})
          break;
        case 'QUEEN':
          this.setState({action: 'Question Master'})
          break;
        case 'KING':
          this.setState({action: 'Make a Rule'})
          break;
        default:
          break;
        }
      this.setState({clicks: this.state.clicks + 1})
      socket.emit('pop-can', this.state.clicks)
    } 
    //else {
    //   this.setState({action: `Can Popped! ${this.state.loser} finish your drink and start a new game!`})
    //   this.setState({canStatus: popped})
    // }
  }
    
  startGame = () => {
    socket.emit('start-game', "The game has started")
  }
  
  nextPlayersTurn = () => {
    socket.emit('next-players-turn', this.state.players)
  }

  render(){
    return (
      <section>
        
        <div className="App">
          <div>
            <button onClick={() => this.startGame()}>Start Game</button>
            <PlayerList players={this.state.players}/>
            <BeerCan canStatus={this.state.canStatus} action={this.state.action}/>
            {/* <Action action={this.state.action}></Action> */}
          </div>
          <div className='action-bar'>
          </div>
          <CardCollection deck={this.state.deck} findAction={this.findAction} socket={socket} players={this.state.players} nextPlayersTurn={this.nextPlayersTurn}/>
        </div>
      </section>
      
    );
  }
    
  
  
}

export default App;
