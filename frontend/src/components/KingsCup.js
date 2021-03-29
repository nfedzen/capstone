import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import CardCollection from './CardCollection'
import BeerCan from './BeerCan'
import BeerCanImage from '../beerCan2.png'
import '../App.css';
import PlayerList from './PlayerList'

// eslint-disable-next-line
const popped = 'http://cdn.lowgif.com/small/f6e92d70bc5aabd6-image-beer-explosion-gif-simpsons-wiki-fandom-powered-by-wikia.gif'
const closed = BeerCanImage
const ENDPOINT = 'http://localhost:3003/'
const socket = socketIOClient(ENDPOINT)
//this.props.roomCode passed down from KingsGameLobby.js

class KingsCup extends Component {
  
  state = {
    gameStatus: false,
    action: 'Choose a Card!',
    clicks: 0,
    turn: 0,
    canPopped: false,
    canStatus: closed,
    players: [],
    deck: [],
    loser: ""
  }
  
  componentDidMount(){
    const name = this.props.name
    const room = this.props.roomCode
    console.log("component did mount hit")
    //room will change to this.props.roomCode
    socket.emit('room', room)
    socket.emit('new-player', name)

    socket.on('game-started', message => {
      this.setState({gameStatus: true})
    })

    socket.on('populate-deck', newDeck => {
      this.setState({deck: newDeck})
    })

    socket.on('add-player', players => {
      if(players){
        this.setState({players: players})
      }
    })

    socket.on('update-players', players => {
        this.setState({players: players})
    })

    socket.on('next-player', message => {
      this.nextPlayersTurn()
    })


    socket.on('game-over', message => {
      this.findAction()
    })

    socket.on('can-pop', name => {
      this.setState({canPopped: true})
      this.setState({canStatus: popped})
      this.setState({loser: name})
      this.setState({action: `Can Popped! ${name} finish your drink and start a new game!`}) 
      
    })
  }

  findAction = (cardValue, player) => {
    const object = {
      player: player,
      clicks: this.state.clicks
    }
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
      object.clicks = object.clicks + 1
      this.setState({clicks: this.state.clicks + 1})
      socket.emit('pop-can', object)
    } 
    
  }
    
  startGame = () => {
    socket.emit('start-game', "The game has started")
  }
  
  nextPlayersTurn = (object) => {
    socket.emit('next-players-turn', object)
  }

  render(){
    return (
      <section>
          <div>
            <div className={this.state.gameStatus === false ? 'button-display' : 'button-hide'}>
              <button onClick={() => this.startGame()}>Start Game</button>
              <h1>Room Code: {this.props.roomCode}</h1>
            </div>
            <PlayerList history={this.props.history} canPopped={this.state.canPopped} loser={this.state.loser} players={this.state.players}/>
            <BeerCan canStatus={this.state.canStatus} action={this.state.action}/>
          </div>
          <div className='action-bar'>
          </div>
          <CardCollection canPopped={this.state.canPopped} deck={this.state.deck} findAction={this.findAction} socket={socket} players={this.state.players} nextPlayersTurn={this.nextPlayersTurn}/>
      </section>
      
    );
  }
    
  
  
}

export default KingsCup;
