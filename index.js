var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const identity = require('./organs/identity');
const jobs = require('./organs/jobs');

const organs = {
    identity,
    jobs
}

const execute = (socketData, socket) => {
    let {organ, method, data, reason} = JSON.parse(socketData);
    organs[organ].execute({method, data, socket, reason});
}

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('data', (socketData) => {
    try{
        execute(socketData, socket);
    }catch(e){ console.log(e, socketData) }
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});