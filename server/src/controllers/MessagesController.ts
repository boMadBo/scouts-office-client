import { Request, Response } from 'express';
import MessagesModel from '../models/Messages';

export const createMessages = async (req: Request, res: Response) => {
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> main
  const newMessage = new MessagesModel({
    ...req.body,
    isReaded: false,
  });
<<<<<<< HEAD
=======
  const newMessage = new MessagesModel(req.body);
>>>>>>> a40623b (add messages logic)
=======

>>>>>>> main

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
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> a40623b (add messages logic)
=======

>>>>>>> main
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> main

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
<<<<<<< HEAD
=======
>>>>>>> a40623b (add messages logic)
=======

>>>>>>> main
