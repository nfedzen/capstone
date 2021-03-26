import React, { Component } from 'react'
import Card from './Card'

class CardCollection extends Component {

  showDeck = () => {
    return this.props.deck.map(card => 
    <Card canPopped={this.props.canPopped} cardImage={this.props.cardImage} key={card.code} flipCard={this.props.flipCard} card={card} findAction={this.props.findAction} nextPlayersTurn={this.props.nextPlayersTurn} players={this.props.players} socket={this.props.socket} />)
  }

  render(){
    return(
      <div className='card-container'>
        {this.showDeck()}
      </div>
  )
  }
  
}
export default CardCollection