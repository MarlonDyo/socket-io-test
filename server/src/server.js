const express = require('express')
const app = express()
var cors = require('cors')
const port = 4000
const socketIo = require('socket.io');
const http = require("http");
const server = http.createServer(app);
const io = socketIo(server); // < Interesting!
const routes = require('./routes/routes')

app.use(cors())
app.use(express.json()) // This is needed to parse json bodies

app.get('/', (req, res) => {
  // io.emit('UpdateUserListing', getFullTimeString()); // emit an event to all connected sockets
  io.emit('UpdateUserListing', socketList); // emit an event to all connected sockets
  
  return res.send('Hello World!')
})

const getFullTimeString = () => {
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return `${date} ${time}`
}

let socketList = {}

io.on('connection', (socket) => {
  console.log(`Connection ${socket.id}`)
  socketList[socket.id] = {
    type: "default",
    created_at: getFullTimeString(),
  }
  
  socket.on('setUserType', msg => {
    console.log(socket.id, '=>', msg)
    if ( msg ) {
      socketList[socket.id].type = msg
      // notifie via an event to all connected sockets
      io.emit('UpdateUserListing', socketList); 
    }
  })

  socket.on('msg', body => {
    console.log(socket.id, ':', body)
    if ( 
      body !== undefined &&
      body.target !== undefined &&
      body.msg !== undefined &&
      socketList[body.target] !== undefined
    ) {
      io.to(`${body.target}`).emit('serverMsg', body.msg)
    }
  })

  socket.on("disconnect", () => {
    socketList[socket.id] = undefined
    console.log(`Client ${socket.id} disconnected`);
    io.emit('UpdateUserListing', socketList);
  });
})


server.listen(port, () => console.log(`Example app listening on port ${port}!`))