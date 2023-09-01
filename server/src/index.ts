import cors from 'cors';
import dotenv from 'dotenv';
<<<<<<< HEAD
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import { Socket } from 'socket.io';
import * as ConversationsController from './controllers/ConversationController';
import * as MessagesController from './controllers/MessagesController';
import * as ObserveController from './controllers/ObserveController';
import * as TasksController from './controllers/TasksController';
import * as UserController from './controllers/UserController';
import MessagesModel from './models/Messages';
import checkAuth from './utils/checkAuth';
import { addUser, removeUser, users } from './utils/socketsUsers';
=======
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import * as ObserveController from './controllers/ObserveController';
import * as TasksController from './controllers/TasksController';
import * as UserController from './controllers/UserController';
import checkAuth from './utils/checkAuth';
>>>>>>> bda062a (edit server for ts)
import { registerValidation } from './validations/auth';

dotenv.config();
const mongodbUri = process.env.MONGODB_URI;
const port = process.env.PORT;

if (mongodbUri) {
  mongoose
    .connect(mongodbUri)
    .then(() => {
      console.log('DB connected');
    })
    .catch(e => console.log(e));
} else {
  console.error('Mongodb URI is not defined.');
}
const app = express();

<<<<<<< HEAD
const io = require('socket.io')(3050, {
  cors: {
    origin: 'http://localhost:3010',
  },
});

const storage = multer.diskStorage({
  destination: (_, file, cb) => {
    cb(null, path.join(__dirname, '/uploads/'));
=======
const storage = multer.diskStorage({
  destination: (_, file, cb) => {
<<<<<<< HEAD
    cb(null, 'uploads');
>>>>>>> bda062a (edit server for ts)
=======
    cb(null, path.join(__dirname, '/uploads/'));
>>>>>>> 266d9e0 (add profile editor)
  },
  filename: (_, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    const fileName = uniqueSuffix + fileExtension;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

<<<<<<< HEAD
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

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

app.post('/auth/register', upload.single('avatar'), registerValidation, UserController.register);
app.post('/auth/signin', UserController.signin);
app.get('/profile', checkAuth, UserController.getProfile);
app.patch('/profile/:id', upload.single('avatar'), UserController.editProfile);
app.get('/users', UserController.getUsers);

app.get('/tasks', TasksController.getTasks);
app.post('/tasks', TasksController.createTask);
app.delete('/tasks/:id', TasksController.deleteTasks);
app.patch('/tasks/:id', TasksController.completeTasks);

app.get('/observe', ObserveController.getObserve);
app.post('/observe', ObserveController.createObserve);
app.delete('/observe/:id', ObserveController.deleteObserve);

app.get('/conversations/:userId', ConversationsController.getConverse);
app.post('/conversations', ConversationsController.createConverse);

app.get('/messages/:conversationId', MessagesController.getMessages);
app.post('/messages', async (req: Request, res: Response) => {
  const newMessage = new MessagesModel({
    ...req.body,
    isReaded: false,
  });

  try {
    const savedMessage = await newMessage.save();
    console.log('savedMessage', savedMessage);
    io.to(req.body.sender).emit('getMessage', savedMessage);
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});
app.patch('/messages/:id', MessagesController.readMessages);
=======
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

app.post('/auth/register', upload.single('avatar'), registerValidation, UserController.register);
app.post('/auth/signin', UserController.signin);
app.get('/profile', checkAuth, UserController.getProfile);
<<<<<<< HEAD
>>>>>>> bda062a (edit server for ts)

=======
>>>>>>> 590496a (todo on server)
app.patch('/profile/:id', upload.single('avatar'), UserController.editProfile);

app.get('/tasks', TasksController.getTasks);
app.post('/tasks', TasksController.createTask);
app.delete('/tasks/:id', TasksController.deleteTasks);
app.patch('/tasks/:id', TasksController.completeTasks);

app.get('/observe', ObserveController.getObserve);
app.post('/observe', ObserveController.createObserve);
app.delete('/observe/:id', ObserveController.deleteObserve);

app
  .listen(3014)
  .on('listening', () => {
    console.log('It works');
  })
  .on('error', (err: Error) => {
    console.error(err);
  });
