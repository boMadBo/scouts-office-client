import { Request, Response } from 'express';
import MessagesModel from '../models/Messages';

export const createMessages = async (req: Request, res: Response) => {
  const newMessage = new MessagesModel({
    ...req.body,
    isReaded: false,
  });

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
