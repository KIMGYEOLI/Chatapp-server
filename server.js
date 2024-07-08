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



// const express = require('express');
// const app = express();

// const http = require('http').createServer(app);
// // const io = require('socket.io')(http, {cors:{origin:"*"}})
// const io = require('socket.io')(http, {
//   cors: { origin: "*" },
//   pingInterval: 25000, // 25 seconds
//   pingTimeout: 60000 // 60 seconds
// });

// let userInfo = [];

// io.on('connection', (socket) => {
//   console.log('New client connected:', socket.id);
  
//   socket.on('login', (nickName) => {
//     console.log('Login event received from', nickName, socket.id);
//     const info = {
//       nickName:nickName,
//       id: socket.id
//     };

//     userInfo.push(info)

//     const getCurrentDate = () => {
//       const now = new Date();
//       const year = now.getFullYear();
//       const month = String(now.getMonth() + 1).padStart(2, '0');
//       const day = String(now.getDate()).padStart(2, '0');
//       return `${year}-${month}-${day}`;
//     };

//     const currentDate = getCurrentDate();
    
//     // 날짜 메시지 전송
//     console.log('Sending date message:', currentDate);
//     io.emit('msg', { level: "date", msg: currentDate, nickName: "", date: currentDate });
    
//     io.emit('msg', {level: "sys", msg:nickName+" 님이 입장하였습니다.", nickName:"", date: currentDate });    
//     });

//   socket.on('sendMessage', ({nickName:nickName, msg:msg}) => {
//     const getCurrentDate = () => {
//       const now = new Date();
//       const year = now.getFullYear();
//       const month = String(now.getMonth() + 1).padStart(2, '0');
//       const day = String(now.getDate()).padStart(2, '0');
//       return `${year}-${month}-${day}`;
//     };

//     const currentDate = getCurrentDate();

//     socket.broadcast.emit('msg', { level: "other", msg: msg, nickName: nickName,  date: currentDate });
//     socket.emit('msg', { level: "me", msg: msg, nickName: nickName, date: currentDate });
//   });

//   socket.on('disconnect', () => {
//     const user = userInfo.find(c=>c.id == socket.id)
//     if(user) {
//       socket.broadcast.emit('msg', {level:"sys", msg:user.nickName+" 님이 퇴장하였습니다.", nickName:""});
//     }
//   });
// });

// http.listen(process.env.PORT || 5000, ()=>{
//     console.log("connected!!!")
// });



// const express = require('express');
// const app = express();

// const http = require('http').createServer(app);
// // const io = require('socket.io')(http, {cors:{origin:"*"}})

// const io = require('socket.io')(http, {
//   cors: { origin: "*" },
//   pingInterval: 25000, // 25 seconds
//   pingTimeout: 60000 // 60 seconds
// });


// let userInfo = [];

// io.on('connection', (socket) => {
//   console.log('New client connected:', socket.id);
  
//   socket.on('login', (nickName) => {
//     console.log('Login event received from', nickName, socket.id);
//     const info = {
//       nickName:nickName,
//       id: socket.id
//     };

//     userInfo.push(info)
//     io.emit('msg', {level: "sys", msg:nickName+" 님이 입장하였습니다.", nickName:""});    
//     io.emit('updateUserList', userInfo);  
//     console.log('Updated user list:', userInfo);
//   });

//   socket.on('sendMessage', ({nickName:nickName, msg:msg}) => {

//     socket.broadcast.emit('msg', { level: "other", msg: msg, nickName: nickName });
//     socket.emit('msg', { level: "me", msg: msg, nickName: nickName });
//   });

//   socket.on('disconnect', () => {
//     const user = userInfo.find(c=>c.id == socket.id)
//     if(user) {
//       userInfo = userInfo.filter(c => c.id !== socket.id);
//       socket.broadcast.emit('msg', {level:"sys", msg:user.nickName+" 님이 퇴장하였습니다.", nickName:""});
//     }
//   });
// });

// http.listen(process.env.PORT || 5000, ()=>{
//     console.log("connected!!!")
// });


// const express = require('express');
// const app = express();

// const http = require('http').createServer(app);
// const io = require('socket.io')(http, {
//   cors: { origin: "*" },
//   pingInterval: 25000, // 25 seconds
//   pingTimeout: 60000 // 60 seconds
// });

// let userInfo = [];
// let chatRooms = [];

// io.on('connection', (socket) => {
//   console.log('New client connected:', socket.id);

//   socket.on('login', (nickName) => {
//     console.log('Login event received from', nickName, socket.id);
//     const info = {
//       nickName: nickName,
//       id: socket.id
//     };

//     userInfo.push(info);
//     io.emit('msg', { level: "sys", msg: nickName + " 님이 입장하였습니다.", nickName: "" });
//     io.emit('updateUserList', userInfo);
//     io.emit('updateRoomList', chatRooms);
//     console.log('Updated user list:', userInfo);
//   });

//   socket.on('createRoom', ({ roomName, password }) => {
//     const room = {
//       roomName: roomName,
//       password: password,
//       users: []
//     };
//     chatRooms.push(room);
//     io.emit('updateRoomList', chatRooms);
//   });

//   socket.on('joinRoom', ({ roomName, password }) => {
//     const room = chatRooms.find(room => room.roomName === roomName);
//     if (room) {
//       if (room.password === password) {
//         room.users.push(socket.id);
//         socket.join(roomName);
//         socket.emit('joinRoomSuccess', { roomName: roomName });
//         io.to(roomName).emit('msg', { level: "sys", msg: socket.id + " 님이 입장하였습니다.", nickName: "" });
//       } else {
//         socket.emit('joinRoomFail', { msg: "Incorrect password." });
//       }
//     } else {
//       socket.emit('joinRoomFail', { msg: "Room not found." });
//     }
//   });

//   socket.on('sendMessage', ({ roomName, nickName, msg }) => {
//     io.to(roomName).emit('msg', { level: "other", msg: msg, nickName: nickName });
//     socket.emit('msg', { level: "me", msg: msg, nickName: nickName });
//   });

//   socket.on('disconnect', () => {
//     const user = userInfo.find(c => c.id == socket.id);
//     if (user) {
//       userInfo = userInfo.filter(c => c.id !== socket.id);
//       socket.broadcast.emit('msg', { level: "sys", msg: user.nickName + " 님이 퇴장하였습니다.", nickName: "" });
//     }
//   });
// });

// http.listen(process.env.PORT || 5000, () => {
//   console.log("connected!!!");
// });

const express = require('express');
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: { origin: "*" },
  pingInterval: 25000,
  pingTimeout: 60000
});

let userInfo = [];
let chatRooms = [
  { roomName: "송탁쿤 정신차리자", createdBy: "a", users: [] },
  { roomName: "🍟감튀를 사랑하는 자들🍟", createdBy: "a", users: [] },
  { roomName: "Room3", createdBy: "a", users: [] }
];

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('login', (nickName) => {
    const info = { nickName, id: socket.id };
    userInfo.push(info);
    io.emit('updateUserList', userInfo);
    socket.emit('updateRoomList', chatRooms);  // 로그인 시 채팅방 목록을 전송
  });

  socket.on('createRoom', ({ roomName, createdBy }) => {
    const room = { roomName, createdBy , users: [] };
    chatRooms.push(room);
    io.emit('updateRoomList', chatRooms);
  });

  socket.on('deleteRoom', ({ roomName, requestedBy }) => {
    const room = chatRooms.find(room => room.roomName === roomName);
    if(room && room.createdBy === requestedBy) {
      chatRooms = chatRooms.filter(room => room.roomName !== roomName);
      io.emit('updateRoomList', chatRooms);
    } else {
      socket.emit('deleteRoomFail', {msg: "Only the creator can delete this room."});
    }
  });

  socket.on('joinRoom', ({ roomName, nickName }) => {
    console.log(`Join room request: ${roomName} by ${nickName}`);  // 로그 추가
    const room = chatRooms.find(room => room.roomName === roomName);
    if (room) {
      room.users.push({ id: socket.id, nickName });
      socket.join(roomName);
      console.log(`User ${nickName} joined room: ${roomName}`);  // 로그 추가
      socket.emit('joinRoomSuccess', { roomName });
      io.to(roomName).emit('msg', { level: "sys", msg: `${nickName} 님이 입장하였습니다.`, nickName: "" });
    } else {
      socket.emit('joinRoomFail', { msg: "Room not found." });
    }
  });

  socket.on('leaveRoom', ({roomName, nickName}) => {
    console.log(`Leave room request: ${roomName} by ${nickName}`);
    const room = chatRooms.find(room => room.roomName === roomName);
    if(room) {
      room.users = room.users.filter(user => user.id !== socket.id);
      socket.leave(roomName);
      console.log(`User ${nickName} left room: ${roomName}`);
      io.to(roomName).emit('msg', {level: "sys", msg: `${nickName} 님이 퇴장하였습니다.`});
    }
  });

  // socket.on('sendMessage', ({ roomName, nickName, msg }) => {
  //   console.log(`Message from ${nickName} in room ${roomName}: ${msg}`);
  //   io.to(roomName).emit('msg', { level: "other", msg, nickName });
  //   socket.emit('msg', { level: "me", msg, nickName });
  // });
  socket.on('sendMessage', ({ roomName, nickName, msg }) => {
    // console.log(`Message from ${nickName} in room ${roomName}: ${msg}`);
    io.to(roomName).emit('msg', { level: "other", msg, nickName });
  });
  

  socket.on('disconnect', () => {
    const user = userInfo.find(c => c.id == socket.id);
    if (user) { 
      userInfo = userInfo.filter(c => c.id !== socket.id);
      chatRooms.forEach(room => {
        const userIndex = room.users.findIndex(u => u.id === socket.id);
        if (userIndex !== -1) {
          room.users.splice(userIndex, 1);
          io.to(room.roomName).emit('msg', { level: "sys", msg: `${user.nickName} 님이 퇴장하였습니다.`, nickName: "" });
        }
      });
      io.emit('updateUserList', userInfo);
    }
  });
});
http.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 5000");
});
