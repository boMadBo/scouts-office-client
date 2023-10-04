import { Request, Response } from 'express';
import ObserveModel from '../models/Observe';

export const getObserve = async (req: Request, res: Response) => {
  try {
<<<<<<< HEAD
    const observe = await ObserveModel.find();
=======
    const userId = req.params.userId;
    const observe = await ObserveModel.find({
      userId: userId,
    });
>>>>>>> main
    res.json(observe);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Failed to get observe',
    });
  }
};

export const createObserve = async (req: Request, res: Response) => {
  try {
    const doc = new ObserveModel({
<<<<<<< HEAD
=======
      userId: req.body.userId,
>>>>>>> main
      id: req.body.id,
    });
    const observe = await doc.save();
    res.json(observe);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Failed to create observe',
    });
  }
};

export const deleteObserve = async (req: Request, res: Response) => {
  try {
    const observeId = req.params.id;
    const doc = await ObserveModel.findByIdAndDelete(observeId);
    if (!doc) {
      return res.status(404).json({
        message: 'Observe not found',
      });
    }

    res.json({
      success: true,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Failed to delete observe',
    });
  }
};
