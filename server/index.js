import express from 'express'
import { Server } from 'socket.io';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createServer } from 'node:http';

const app = express();
const server = createServer(app);
const io = new Server(server);

const port = 4000;

const __dirname = dirname(fileURLToPath(import.meta.url));
app.get('/', (req,res) => {
  res.sendFile(join(__dirname, 'index.html'));
})

io.on('connection', (socket)=>{
  // console.log("a user connected");
  // socket.on('disconnect',()=>{
  //   console.log('user disconnected');
  // })
  socket.on('chat message', (msg)=>{
    io.emit('chat message', msg);
  })
})

// app.get('/login', (req,res)=>{
//   res.send('<h1>kya bolti public</h1>')
// })

server.listen(port,()=>{
  console.log(`the app is running at this port: ${port}`)
})