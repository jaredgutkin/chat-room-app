const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')


const app = express()
const server = http.createServer(app)
const io = socketio(server)

//Set static folder
app.use(express.static(path.join(__dirname, 'public')))

const botName = 'Hammy'


//run when clent connects
io.on('connection', socket => {

    //welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to Chatcord'))

    //Broadcast when user connects
    socket.broadcast.emit('message', formatMessage(botName, 'A user has joined the chat'))

    //runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'a user has left the chat'))
    })

    //listen for chat message
    socket.on('chatMessage', (msg) =>{
        io.emit('message', formatMessage('USER', msg))
    })
})

const PORT = 3000 || process.env.PORT

server.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})