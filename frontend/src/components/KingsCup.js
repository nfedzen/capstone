import React, { Component, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import CardCollection from "./CardCollection";
import ActionBar from "./ActionBar";
import BeerCanImage from "../beerCan2.png";
import "../App.css";
import PlayerList from "./PlayerList";

// eslint-disable-next-line
const popped =
  "http://cdn.lowgif.com/small/f6e92d70bc5aabd6-image-beer-explosion-gif-simpsons-wiki-fandom-powered-by-wikia.gif";
const closed = BeerCanImage;
const ENDPOINT = "http://localhost:3003/";
const socket = socketIOClient(ENDPOINT);
//this.props.roomCode passed down from KingsGameLobby.js

export default function KingsCup({ history, name, roomCode }) {
  const [gameStatus, setGameStatus] = useState(false);
  const [action, setAction] = useState("Choose a Card!");
  const [clicks, setClicks] = useState(0);
  const [turn, setTurn] = useState(0);
  const [canPopped, setCanPopped] = useState(false);
  const [canStatus, setCanStatus] = useState(popped);
  const [players, setPlayers] = useState([]);
  const [deck, setDeck] = useState([]);
  const [loser, setLoser] = useState("");
  

  useEffect(() => {
    const nameRoomObject = { name: name, room: roomCode };
    console.log("component did mount hit");
    console.log(nameRoomObject)
    //room will change to this.props.roomCode
    socket.emit("room", roomCode);
    socket.emit("new-player", nameRoomObject);
  }, [name,roomCode]);

  useEffect(() => {
    socket.on("game-started", (message) => {
      setGameStatus(true);
    });

    socket.on("populate-deck", (newDeck) => {
      setDeck(newDeck);
    });

    socket.on("add-player", (players) => {
      console.log("add-player hit")
      if (players) {
        console.log(players)
        setPlayers(players);
      }
    });

    socket.on("update-players", (players) => {
      setPlayers(players);
    });

    socket.on("next-player", (object) => {
      nextPlayersTurn(object);
    });

    socket.on("game-over", (message) => {
      findAction();
    });

    socket.on("can-pop", (name) => {
      setCanPopped(true);
      setCanStatus(popped);
      setLoser(name);
      setAction({
        action: `Can Popped! ${name} finish your drink and start a new game!`,
      });
    });
  });

  function findAction(cardValue, player) {
    const object = {
      player: player,
      clicks: clicks,
      roomCode: roomCode,
    };
    if (!canPopped) {
      switch (cardValue) {
        case "ACE":
          setAction("Waterfall");
          break;
        case "2":
          setAction("Pick someone to drink");
          break;
        case "3":
          setAction("Take a drink");
          break;
        case "4":
          setAction("Floor");
          break;
        case "5":
          setAction("Guys");
          break;
        case "6":
          setAction("Chicks");
          break;
        case "7":
          setAction("Heaven");
          break;
        case "8":
          setAction("Date");
          break;
        case "9":
          setAction("Rhyme");
          break;
        case "10":
          setAction("Categories");
          break;
        case "JACK":
          setAction("Never Have I Ever");
          break;
        case "QUEEN":
          setAction("Question Master");
          break;
        case "KING":
          setAction("Make a Rule");
          break;
        default:
          break;
      }
      object.clicks = object.clicks + 1;
      setClicks(clicks + 1);
      socket.emit("pop-can", object);
    }
  }

  function startGame() {
    socket.emit("start-game", roomCode);
  }

  function nextPlayersTurn(object) {
    socket.emit("next-players-turn", object);
  }

  return (
    <section>
      <div>
        <div
          className={
            gameStatus === false ? "button-display form" : "button-hide"
          }
        >
          <button className="button1" onClick={() => startGame()}>
            Start Game
          </button>
          <h1>Room Code: {roomCode}</h1>
        </div>
        <PlayerList
          socket={socket}
          history={history}
          canPopped={canPopped}
          loser={loser}
          players={players}
        />
        <ActionBar canStatus={canStatus} action={action} />
      </div>
      <div className="action-bar"></div>
      <CardCollection
        roomCode={roomCode}
        canPopped={canPopped}
        deck={deck}
        findAction={findAction}
        socket={socket}
        players={players}
        nextPlayersTurn={nextPlayersTurn}
      />
    </section>
  );
}

// class KingsCup extends Component {
//   state = {
//     gameStatus: false,
//     action: "Choose a Card!",
//     clicks: 0,
//     turn: 0,
//     canPopped: false,
//     canStatus: closed,
//     players: [],
//     deck: [],
//     loser: "",
//   };

//   componentDidMount() {
//     const name = this.props.name;
//     const room = this.props.roomCode;
//     const nameRoomObject = { name: name, room: room };
//     console.log("component did mount hit");
//     //room will change to this.props.roomCode
//     socket.emit("room", room);
//     socket.emit("new-player", nameRoomObject);

//     socket.on("game-started", (message) => {
//       this.setState({ gameStatus: true });
//     });

//     socket.on("populate-deck", (newDeck) => {
//       this.setState({ deck: newDeck });
//     });

//     socket.on("add-player", (players) => {
//       if (players) {
//         this.setState({ players: players });
//       }
//     });

//     socket.on("update-players", (players) => {
//       this.setState({ players: players });
//     });

//     socket.on("next-player", (object) => {
//       this.nextPlayersTurn(object);
//     });

//     socket.on("game-over", (message) => {
//       this.findAction();
//     });

//     socket.on("can-pop", (name) => {
//       this.setState({ canPopped: true });
//       this.setState({ canStatus: popped });
//       this.setState({ loser: name });
//       this.setState({
//         action: `Can Popped! ${name} finish your drink and start a new game!`,
//       });
//     });
//   }

//   findAction = (cardValue, player) => {
//     const object = {
//       player: player,
//       clicks: this.state.clicks,
//       roomCode: this.props.roomCode,
//     };
//     if (!this.state.canPopped) {
//       switch (cardValue) {
//         case "ACE":
//           this.setState({ action: "Waterfall" });
//           break;
//         case "2":
//           this.setState({ action: "Pick someone to drink" });
//           break;
//         case "3":
//           this.setState({ action: "Take a drink" });
//           break;
//         case "4":
//           this.setState({ action: "Floor" });
//           break;
//         case "5":
//           this.setState({ action: "Guys" });
//           break;
//         case "6":
//           this.setState({ action: "Chicks" });
//           break;
//         case "7":
//           this.setState({ action: "Heaven" });
//           break;
//         case "8":
//           this.setState({ action: "Date" });
//           break;
//         case "9":
//           this.setState({ action: "Rhyme" });
//           break;
//         case "10":
//           this.setState({ action: "Categories" });
//           break;
//         case "JACK":
//           this.setState({ action: "Never Have I Ever" });
//           break;
//         case "QUEEN":
//           this.setState({ action: "Question Master" });
//           break;
//         case "KING":
//           this.setState({ action: "Make a Rule" });
//           break;
//         default:
//           break;
//       }
//       object.clicks = object.clicks + 1;
//       this.setState({ clicks: this.state.clicks + 1 });
//       socket.emit("pop-can", object);
//     }
//   };

//   startGame = () => {
//     socket.emit("start-game", this.props.roomCode);
//   };

//   nextPlayersTurn = (object) => {
//     socket.emit("next-players-turn", object);
//   };

//   render() {
//     return (
//       <section>
//         <div>
//           <div
//             className={
//               this.state.gameStatus === false
//                 ? "button-display form"
//                 : "button-hide"
//             }
//           >
//             <button className="button1" onClick={() => this.startGame()}>
//               Start Game
//             </button>
//             <h1>Room Code: {this.props.roomCode}</h1>
//           </div>
//           <PlayerList
//             socket={socket}
//             history={this.props.history}
//             canPopped={this.state.canPopped}
//             loser={this.state.loser}
//             players={this.state.players}
//           />
//           <ActionBar
//             canStatus={this.state.canStatus}
//             action={this.state.action}
//           />
//         </div>
//         <div className="action-bar"></div>
//         <CardCollection
//           roomCode={this.props.roomCode}
//           canPopped={this.state.canPopped}
//           deck={this.state.deck}
//           findAction={this.findAction}
//           socket={socket}
//           players={this.state.players}
//           nextPlayersTurn={this.nextPlayersTurn}
//         />
//       </section>
//     );
//   }
// }

// export default KingsCup;
