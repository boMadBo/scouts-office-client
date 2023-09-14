import { Request, Response } from 'express';
import MessagesModel from '../models/Messages';

export const createMessages = async (req: Request, res: Response) => {
  const newMessage = new MessagesModel(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await MessagesModel.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};
