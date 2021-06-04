import React, { useState } from "react";

export default function PlayerForm({ history, addPlayer }) {
  const [name, setName] = useState("");

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    addPlayer(name);
    history.push("./GamesPage");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="players">What is your name?</label>
      <input
        onChange={handleChange}
        type="text"
        name="name"
        value={name}
      ></input>
      <input className="button1" type="submit"></input>
    </form>
  );
}
