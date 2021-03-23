const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const cors = require('cors')
const fetch = require('node-fetch')

const port = process.env.PORT || 3003
const index = require("../kings-cup-backend/routes/index")

const app = express()

app.use(cors)
app.use(index)


const server = http.createServer(app)

const io = socketio(server, {
  cors: {
    origin: "*"
  }
})

let canGetDeck = true
let players = []
let turn = 0
const gameId = "Wooo"

io.on('connection', socket => {
  console.log("New User Connected")
  const socketId = socket.id

  socket.on('room', room =>{
    socket.join(room)
  })

  socket.on('new-player', name => {
    players.push({
      "userId": name,
      "isTurn": false,
      "socketId": socketId
    })
    
    io.in(gameId).emit('add-player', players)
  })
  
  socket.on('start-game', message => {
    canGetDeck = false
    getDeck()
    players[0].isTurn = true
    io.in(gameId).emit('add-player', players)
  })
  
  socket.on('next-players-turn', nextPlayers => {
      let player = {...nextPlayers[turn]}
      player.isTurn = false
      nextPlayers[turn] = player
      
      if(turn + 1 === players.length){
        turn = 0
      } else {
        turn = turn + 1
      }

      let nextPlayer = {...players[turn]}
      nextPlayer.isTurn = true
      nextPlayers[turn] = nextPlayer

      players = nextPlayers
      io.in(gameId).emit('update-players', players)
  })

  socket.on('next-turn', message => {
    io.in(gameId).emit('update-players', players)
  })
  
  socket.on('card-flip', card => {
    io.in(gameId).emit('flip-card', card)
  })
  
  socket.on('pop-can', clicks => {
    let min = Math.ceil(clicks)
    let max = Math.floor(52)
    if( (52 === Math.floor(Math.random() * (max - min + 1) + min)) || (clicks === 51)){
      io.in(gameId).emit('can-pop', socket.id)
    } else {
      io.in(gameId).emit('next-player', "next player")
    }
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



server.listen(port, () => console.log(`Listening on port ${port}`))