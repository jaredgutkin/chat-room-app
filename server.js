const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')


const app = express()
const server = http.createServer(app)
const io = socketio(server)

//Set static folder
app.use(express.static(path.join(__dirname, 'public')))


//run when clent connects
io.on('connection', socket => {

    //welcome current user
    socket.emit('message', 'Welcome to Chatcord')

    //Broadcast when user connects
    socket.broadcast.emit('message', 'A user has joined the chat')

    //runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'a user has left the chat')
    })
})

const PORT = 3000 || process.env.PORT

server.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})