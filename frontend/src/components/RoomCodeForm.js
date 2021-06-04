import React, { Component } from "react";

export default class RoomCodeForm extends Component {
  state = {
    roomCode: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addRoomCode(this.state.roomCode);
    this.props.history.push("/KingsCup");
  };

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <label className="players">What is the Room Code?</label>
        <input
          onChange={this.handleChange}
          type="text"
          name="roomCode"
          value={this.state.roomCode}
        ></input>
        <input className="button1" type="submit"></input>
      </form>
    );
  }
}
