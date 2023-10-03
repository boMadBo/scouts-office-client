import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import * as ConversationsController from './controllers/ConversationController';
import * as MessagesController from './controllers/MessagesController';
import * as ObserveController from './controllers/ObserveController';
import * as TasksController from './controllers/TasksController';
import * as UserController from './controllers/UserController';
import checkAuth from './utils/checkAuth';
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

const storage = multer.diskStorage({
  destination: (_, file, cb) => {
    cb(null, path.join(__dirname, '/uploads/'));
  },
  filename: (_, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    const fileName = uniqueSuffix + fileExtension;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

app.post('/auth/register', upload.single('avatar'), registerValidation, UserController.register);
app.post('/auth/signin', UserController.signin);
app.get('/profile', checkAuth, UserController.getProfile);
app.patch('/profile/:id', upload.single('avatar'), UserController.editProfile);
app.get('/users', UserController.getUsers);

app.get('/tasks/:userId', TasksController.getTasks);
app.post('/tasks', TasksController.createTask);
app.delete('/tasks/:id', TasksController.deleteTasks);
app.patch('/tasks/:id', TasksController.completeTasks);

app.get('/observe/:userId', ObserveController.getObserve);
app.post('/observe', ObserveController.createObserve);
app.delete('/observe/:id', ObserveController.deleteObserve);

app.get('/conversations/:userId', ConversationsController.getConverse);
app.post('/conversations', ConversationsController.createConverse);

app.get('/messages/:conversationId', MessagesController.getMessages);
app.post('/messages', MessagesController.createMessages);

app
  .listen(3014)
  .on('listening', () => {
    console.log('It works');
  })
  .on('error', (err: Error) => {
    console.error(err);
  });
