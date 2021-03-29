import React, { Component } from 'react'
import RoomCodeForm from './RoomCodeForm'



class CreateJoinPage extends Component {

  state = {
    roomCode:''
  }

  handleClick = () => {
    let code = this.randomCodeGenerator(5)
    this.props.addRoomCode(code)
    this.props.history.push('/KingsCup')
  }

  randomCodeGenerator = (length) => {
      let result           = '';
      let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let charactersLength = characters.length;
      for ( let i = 0; i < length; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      console.log(result)
      return result;
  }

  render(){
    return (
      <section>
        <h1>Create or Join a game of King's Cup</h1>
        <button onClick={this.handleClick}>Create</button>
        <RoomCodeForm addRoomCode={this.props.addRoomCode} history={this.props.history}/>
      </section>
    );
  }
}

export default CreateJoinPage;