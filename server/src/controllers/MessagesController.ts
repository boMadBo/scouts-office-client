import { Request, Response } from 'express';
import { Socket } from 'socket.io';
import MessagesModel from '../models/Messages';
import { addUser, getUser, removeUser, users } from '../utils/socketsUsers';

const io = require('socket.io')(3050, {
  cors: {
    origin: 'http://localhost:3010',
  },
});

io.on('connection', (socket: Socket) => {
  console.log('a user connected.');

  socket.on('addUser', (userId: string) => {
    addUser(userId, socket.id);
    io.emit('getUsers', users);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});

export const getAllMessages = async (req: Request, res: Response) => {
  try {
    const messages = await MessagesModel.find();
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const limit = typeof req.query.limit === 'string' ? req.query.limit : '10';
    const parsedLimit = parseInt(limit, 10);
    const messages = await MessagesModel.find({
      conversationId: req.params.conversationId,
    })
      .sort({ createdAt: -1 })
      .limit(parsedLimit);

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createMessages = async (req: Request, res: Response) => {
  const newMessage = new MessagesModel({
    ...req.body.message,
    isReaded: false,
  });
  const reciever = req.body.message.reciever;
  try {
    const savedMessage = await newMessage.save();
    const user = getUser(reciever);
    io.to(user?.socketId).emit('getMessage', savedMessage);
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const readMessages = async (req: Request, res: Response) => {
  try {
    const messageId = req.params.id;
    await MessagesModel.updateOne({ _id: messageId }, { isReaded: true });

    res.json({
      success: true,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Failed to read message',
    });
  }
};
