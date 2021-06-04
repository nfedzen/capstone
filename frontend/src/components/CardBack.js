import React from "react";

class CardBack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardImage: "/back_of_playcard11.jpg",
    };
  }

  render() {
    return (
      <div>
        <img className="card" src={this.state.cardImage} alt="cardimg" />
      </div>
    );
  }
}

export default CardBack;
