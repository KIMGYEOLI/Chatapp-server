// const express = require('express');
// const app = express();

// const http = require('http').createServer(app);
// const io = require('socket.io')(http, {cors:{origin:"*"}})

// let userInfo = [];

// io.on('connection', (socket) => {
//   console.log('New client connected:', socket.id);

//   socket.on('login', (nickName) => {
//     const info = {
//       nickName:nickName,
//       id: socket.id
//     };
//     userInfo.push(info)
//     io.emit('msg', {level: "sys", msg:nickName+" 님이 입장하였습니다.", nickName:""});    
//     });

//   socket.on('sendMessage', ({nickName:nickName, msg:msg}) => {
//     socket.broadcast.emit('msg', {level:"", msg: msg, nickName:nickName})
//   });

//   socket.on('disconnect', () => {
//     const user = userInfo.find(c=>c.id == socket.id)
//     if(user) {
//         socket.broadcast.emit('msg', {level:"sys", msg:user.nickName+" 님이 퇴장하였습니다.", nickName:""});
//     }
//   });
// });

// http.listen(process.env.PORT || 5000, ()=>{
//     console.log("connected!!!")
// });



const express = require('express');
const app = express();

const http = require('http').createServer(app);
//const io = require('socket.io')(http, {cors:{origin:"*"}})
const io = require('socket.io')(http, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    },
    pingInterval: 10000, // 10 seconds
    pingTimeout: 5000 // 5 seconds
  });

let userInfo = [];

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('login', (nickName) => {
    const info = {
      nickName:nickName,
      id: socket.id
    };

    userInfo.push(info)

    const getCurrentDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const currentDate = getCurrentDate();
    io.emit('msg', {level: "sys", msg:nickName+" 님이 입장하였습니다.", nickName:"", date: currentDate });    
    });

  socket.on('sendMessage', ({nickName:nickName, msg:msg}) => {

    const getCurrentDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const currentDate = getCurrentDate();
    socket.broadcast.emit('msg', {level:"", msg: msg, nickName:nickName, date: currentDate})
  });

  socket.on('disconnect', () => {
    const user = userInfo.find(c=>c.id == socket.id)
    if(user) {
      const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }; 
      const currentDate = getCurrentDate();
      socket.broadcast.emit('msg', {level:"sys", msg:user.nickName+" 님이 퇴장하였습니다.", nickName:""});
    }
  });
});

http.listen(process.env.PORT || 5000, ()=>{
    console.log("connected!!!")
});