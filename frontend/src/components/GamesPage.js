import React, { Component } from 'react'


class GamesPage extends Component {


  handleClick = () => {
    this.props.history.push('/CreateJoin')
  }

  render(){
    return (
      <section>
        <div className='action-bar'>
        </div>
        <div className='form'>
        <h1>Choose your favorite game!</h1>
        <div className='image-container'>
          <img className='kings-img' onClick={this.handleClick} alt='kings cup' src='https://cdn.backyard.games/wp-content/uploads/2017/10/21013448/Kings-Cup-Drinking-Card-Game-1080x675.png'></img>
        </div>
        </div>
      </section>
    );
  }
}

export default GamesPage;