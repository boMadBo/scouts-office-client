import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
<<<<<<< HEAD
<<<<<<< HEAD
import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';
=======
import jwt from 'jsonwebtoken';
>>>>>>> bda062a (edit server for ts)
=======
import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';
>>>>>>> 266d9e0 (add profile editor)
import UserModel from '../models/User';
import { instance } from './helpers';

interface MyRequest extends Request {
  userId?: string;
}

export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const birthDate = new Date(req.body.birthDate);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.file?.filename,
      passwordHasch: hash,
      country: req.body.country,
      birthDate: birthDate,
    });

    const user = await doc.save();

    const { passwordHasch, ...userData } = user.toObject();
    res.json({
      ...userData,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Failed to register',
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: 'Login failed',
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user.toObject().passwordHasch);

    if (!isValidPass) {
      return res.status(400).json({
        message: 'Uncorrect login or password',
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      }
    );

    const { passwordHasch, ...userData } = user.toObject();
    res.cookie('token', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.json({
      ...userData,
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Failed to log in',
    });
  }
};

export const getProfile = async (req: MyRequest, res: Response) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    const { passwordHasch, avatarUrl, ...userData } = user.toObject();

    let imageUrl = '';
    if (avatarUrl) {
      imageUrl = `${instance}/${avatarUrl.toString()}`;
    }

    res.json({ ...userData, avatarUrl: imageUrl });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Failed to get the user',
    });
  }
};
<<<<<<< HEAD
<<<<<<< HEAD

export const getUsers = async (req: MyRequest, res: Response) => {
  try {
    const users = await UserModel.find();

    const userData = users.map(user => {
      const { avatarUrl, ...userData } = user.toObject();
      let imageUrl = '';
      if (avatarUrl) {
        imageUrl = `${instance}/${avatarUrl.toString()}`;
      }
      return { ...userData, avatarUrl: imageUrl };
    });

    res.json(userData);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Failed to get users',
    });
  }
};
=======
>>>>>>> 266d9e0 (add profile editor)

export const getUsers = async (req: MyRequest, res: Response) => {
  try {
    const users = await UserModel.find();

    const userData = users.map(user => {
      const { avatarUrl, ...userData } = user.toObject();
      let imageUrl = '';
      if (avatarUrl) {
        imageUrl = `${instance}/${avatarUrl.toString()}`;
      }
      return { ...userData, avatarUrl: imageUrl };
    });

    res.json(userData);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Failed to get users',
    });
  }
};

export const editProfile = async (req: Request, res: Response) => {
  try {
    const password = req.body.password;
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const newHash = await bcrypt.hash(password, salt);

    const updateFields: { fullName?: string; avatarUrl?: string; passwordHasch?: string; email?: string } = {};

    if (req.body.fullName) {
      updateFields.fullName = req.body.fullName;
    }

    if (req.body.email) {
      updateFields.email = req.body.email;
    }

    if (req.file && req.file.filename) {
      const currentUser = await UserModel.findOne({ _id: req.params.id });
      if (currentUser && currentUser.avatarUrl) {
        const filePath = path.join(__dirname, '../uploads', currentUser.avatarUrl.toString());
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      updateFields.avatarUrl = req.file.filename;
    }

    if (req.body.password) {
      updateFields.passwordHasch = newHash;
    }

    await UserModel.updateOne({ _id: req.params.id }, updateFields);

    res.json({
      success: true,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Failed to update data',
    });
  }
};
<<<<<<< HEAD
=======
>>>>>>> bda062a (edit server for ts)
=======
>>>>>>> 266d9e0 (add profile editor)
