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
