import React from "react";
import Action from "./Action";

export default class BeerCan extends React.Component {
  render() {
    return (
      <section className="title-section">
        <header className="header">
          <h1 className="title">Welcome To King's Cup!</h1>
        </header>

        <div className="beer-can">
          <img
            className="can"
            src={process.env.PUBLIC_URL + this.props.canStatus}
            alt="closed can"
          />
          <div className="action-text">
            <Action action={this.props.action} />
          </div>
        </div>
      </section>
    );
  }
}
