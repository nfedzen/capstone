const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const cors = require('cors')
const fetch = require('node-fetch')

const port = process.env.PORT || 3003
const index = require("./routes/index")

const app = express()

app.use(cors)
app.use(index)


const server = http.createServer(app)

const io = socketio(server, {
  cors: {
    origin: "*"
  }
})

  let games = []
  let gamesIndex = 0


io.on('connection', socket => {
  console.log("New User Connected")
  const socketId = socket.id

  socket.on('room', roomCode =>{
    socket.join(roomCode)
    if(!createNewRoom(roomCode)){
      const gameObject = {
        gameId: roomCode,
        players: [],
        turn: 0,
        gameStatus: false,
        canGetDeck: true,
        index: gamesIndex
      }
      games.push(gameObject)
      gamesIndex = gamesIndex + 1
    } 
  })

  socket.on('start-game', roomCode => {
    let index = findGame(roomCode)
    games[index].canGetDeck = false
    getDeck(roomCode)
    games[index].players[0].isTurn = true
    io.in(games[index].gameId).emit('game-started', "game started")
    io.in(games[index].gameId).emit('add-player', games[index].players)
  })

  socket.on('new-player', nameRoomObject => {
    let newIndex = findGame(nameRoomObject.room)
    games[newIndex].players.push({
      "userId": nameRoomObject.name,
      "isTurn": false,
      "socketId": socketId
    })
    
    io.in(games[newIndex].gameId).emit('add-player', games[newIndex].players)
  })
  
  socket.on('next-turn', message => {
    io.in(gameId).emit('update-players', players)
  })
  
  socket.on('next-players-turn', object => {
      let index = findGame(object.roomCode)
      let player = {...games[index].players[games[index].turn]}
      player.isTurn = false
      games[index].players[games[index].turn] = player
      
      if(games[index].turn + 1 === games[index].players.length){
        games[index].turn = 0
      } else {
        games[index].turn = games[index].turn + 1
      }

      let nextPlayer = {...games[index].players[games[index].turn]}
      nextPlayer.isTurn = true
      games[index].players[games[index].turn] = nextPlayer
      
      io.in(games[index].gameId).emit('update-players', games[index].players)
    })
    
    socket.on('card-flip', object => {
      let index = findGame(object.roomCode)
      io.in(games[index].gameId).emit('flip-card', object)
    })
  
    //(52 === Math.floor(Math.random() * (max - min + 1) + min)) || (object.clicks === 51)
    socket.on('pop-can', object => {
      let index = findGame(object.roomCode)
      let min = Math.ceil(object.clicks)
      let max = Math.floor(52)
      if( (52 === Math.floor(Math.random() * (max - min + 1) + min)) || (object.clicks === 51)){
        io.in(games[index].gameId).emit('can-pop', object.player)
      } else {
        io.in(games[index].gameId).emit('next-player', object)
      }
    })

  socket.on('game-over', roomCode =>{
    let index = findGame(roomCode)
    io.in(games[index].gameId).emit('game-over', "Game Over")
  })

  socket.on('remove-player', socket =>{
    removePlayer(socket)
    console.log('hit')
  })
  
  
  socket.on("disconnect", () => {
    console.log("Client disconnected")
    removePlayer(socket)
  })
})

const removePlayer = (socket) => {
  let newGames = games.map((game) => {
    return {...game, players: game.players.filter((player) => player.socketId !== socket)}
  })
  
  games = newGames
  
  removeGame()
  console.log(games)
}

const getDeck = (roomCode) => {
  let index = findGame(roomCode)
  fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=52')
      .then(response => response.json())
      .then(cards => io.in(games[index].gameId).emit('populate-deck', cards.cards) )
}

const removeGame = () => {
  let game = games.filter(game => game.players.length !== 0)
  games = game
}

const findGame = (roomId) => {
  let game = games.filter(game => game.gameId === roomId)
  return games.indexOf(game[0])
}

const createNewRoom = (roomId) => {
  let exists = games.forEach(game => {
    if(game.gameId === roomId){
      return true
    }
  })
  if(exists !== true){
    exists === false
  }
  return exists
}


server.listen(port, () => console.log(`Listening on port ${port}`))