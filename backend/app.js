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

  let canGetDeck = true
  let players = []
  let turn = 0
  let gameStatus = false
  let gameId = ''

io.on('connection', socket => {
  console.log("New User Connected")
  const socketId = socket.id

  socket.on('room', roomCode =>{
    socket.join(roomCode)
    gameId = roomCode
  })

  socket.on('start-game', message => {
    canGetDeck = false
    getDeck()
    players[0].isTurn = true
    io.in(gameId).emit('game-started', "game started")
    io.in(gameId).emit('add-player', players)
  })

  socket.on('new-player', name => {
    players.push({
      "userId": name,
      "isTurn": false,
      "socketId": socketId
    })
  
    io.in(gameId).emit('add-player', players)
  })
  
  socket.on('next-turn', message => {
    io.in(gameId).emit('update-players', players)
  })
  
  socket.on('next-players-turn', object => {
      let player = {...players[turn]}
      player.isTurn = false
      players[turn] = player
      
      if(turn + 1 === players.length){
        turn = 0
      } else {
        turn = turn + 1
      }

      let nextPlayer = {...players[turn]}
      nextPlayer.isTurn = true
      players[turn] = nextPlayer
      
      io.in(gameId).emit('update-players', players)
    })
    
    socket.on('card-flip', object => {
      io.in(gameId).emit('flip-card', object)
    })
  
    socket.on('pop-can', object => {
      let min = Math.ceil(object.clicks)
      let max = Math.floor(52)
      if( (52 === Math.floor(Math.random() * (max - min + 1) + min)) || (object.clicks === 51)){
        io.in(gameId).emit('can-pop', object.player)
      } else {
        io.in(gameId).emit('next-player', "next player")
      }
    })

  socket.on('game-over', message =>{
    io.in(gameId).emit('game-over', "Game Over")
  })
  
  
  socket.on("disconnect", () => {
    console.log("Client disconnected")
    removePlayer(socket)
  })
})

const removePlayer = (socket) => {
  players = players.filter(player => player.socketId !== socket.id)
}

const getDeck = () => {
  fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=52')
      .then(response => response.json())
      .then(cards => io.in(gameId).emit('populate-deck', cards.cards) )
}
const findGame = (roomId) => {
  return games.filter(game => game.roomId === roomId)
}



server.listen(port, () => console.log(`Listening on port ${port}`))