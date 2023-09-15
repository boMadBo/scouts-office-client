import { Socket } from 'socket.io';
const io = require('socket.io')(3050, {
  cors: {
    origin: 'http://localhost:3010',
  },
});

type User = {
  userId: string;
  socketId: string;
};

let users: User[] = [];

const addUser = (userId: string, socketId: string): void => {
  !users.some(user => user.userId === userId) && users.push({ userId, socketId });
};

const getUser = (userId: string) => {
  return users.find(user => user.userId === userId);
};

const removeUser = (socketId: string) => {
  users = users.filter(user => user.socketId !== socketId);
};

io.on('connection', (socket: Socket) => {
  console.log('a user connected.');

  socket.on('addUser', userId => {
    addUser(userId, socket.id);
    io.emit('getUsers', users);
  });

  socket.on('sendMessage', ({ senderId, receiverId, text, senderName }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit('getMessage', {
      senderId,
      text,
      senderName,
    });
    console.log('senderName', senderName);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});
