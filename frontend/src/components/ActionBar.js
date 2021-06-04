import React from "react";
import Action from "./Action";

export default function ActionBar({ canStatus, action }) {
  return (
    <section className="title-section">
      <header className="header">
        <h1 className="title">Welcome To King's Cup!</h1>
      </header>

      <div className="beer-can">
        <img
          className="can"
          src={process.env.PUBLIC_URL + canStatus}
          alt="closed can"
        />
        <div className="action-text">
          <Action action={action} />
        </div>
      </div>
    </section>
  );
}
