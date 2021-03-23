import React from 'react'
import { Socket } from 'socket.io-client';


class Card extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cardImage: '/back_of_playcard11.jpg',
      flippedCardImage: this.props.card.image,
      showedImage: "",
      cardCode: this.props.card.code
    }
  }


  componentDidMount(){
    this.setState({showedImage: this.state.cardImage})

    this.props.socket.on('flip-card', card => {
      
      if(card.code === this.state.cardCode){
        this.flipCard()
      }
    })
  }

  flipCard = () => {
    this.setState({
      showedImage: this.state.flippedCardImage
    })
    this.props.findAction(this.props.card.value)
    
    
  }

  checkTurn = () => {
    this.props.players.forEach(player => {
      if((player.socketId === this.props.socket.id ) && (player.isTurn === true)){
        this.props.socket.emit('card-flip', this.props.card)
        this.props.nextPlayersTurn()
      }
    })
  }

  render(){
    return(
      <div>
        <img className='card' onClick={() => this.checkTurn()} src={this.state.showedImage} alt="cardimg"/>
      </div>
    )
  }
}

export default Card
