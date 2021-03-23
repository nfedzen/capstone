import React from 'react'


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

    this.props.socket.on('flip-card', object => {
      
      if(object.card.code === this.state.cardCode){
        this.flipCard(object.player)
      }
    })
  }

  flipCard = (player) => {
    this.setState({
      showedImage: this.state.flippedCardImage
    })
    this.props.findAction(this.props.card.value, player)
    
    
  }

  checkTurn = () => {
    this.props.players.forEach(player => {
      if((player.socketId === this.props.socket.id ) && (player.isTurn === true)){
        const object = {
          card: this.props.card,
          player: player.userId
        }
        if(this.props.canPopped){
          console.log("game-over hit")
          this.props.socket.emit('game-over', "Game Over")
        } else {
          this.props.socket.emit('card-flip', object)
          this.props.nextPlayersTurn()
        }
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
