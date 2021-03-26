import React, { Component } from 'react'


export default class PlayerForm extends Component {
  state = {
    name: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit =(event) => {
    event.preventDefault()
    this.props.addPlayer(this.state.name)
    this.props.history.push('/KingsCup')
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
          <label>What is your name?</label>
          <input onChange={this.handleChange} type='text' name='name' value={this.state.name}></input>
          <input type='submit'></input>
      </form>
    )
  }
}