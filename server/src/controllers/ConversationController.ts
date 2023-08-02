import { Request, Response } from 'express';
import ConversationModel from '../models/Conversation';

export const createConverse = async (req: Request, res: Response) => {
  const newConversation = new ConversationModel({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getConverse = async (req: Request, res: Response) => {
  try {
    const conversation = await ConversationModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};
