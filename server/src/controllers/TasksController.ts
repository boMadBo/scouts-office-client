import { Request, Response } from 'express';
import TaskModel from '../models/Task';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const tasks = await TaskModel.find({
      userId: userId,
    });

    res.json(tasks);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Failed to get tasks',
    });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const doc = new TaskModel({
      userId: req.body.userId,

      text: req.body.text,
      completed: false,
    });
    const task = await doc.save();
    res.json(task);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Failed to create task',
    });
  }
};

export const deleteTasks = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;

    const doc = await TaskModel.findByIdAndDelete({
      _id: taskId,
    });

    if (!doc) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    res.json({
      success: true,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Failed to delete task',
    });
  }
};

export const completeTasks = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    await TaskModel.updateOne({ _id: taskId }, { completed: req.body.completed });

    res.json({
      success: true,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Failed to complete tasks',
    });
  }
};
