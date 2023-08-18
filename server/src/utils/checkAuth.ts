import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface MyRequest extends Request {
  userId?: string;
}

interface MyJwtPayload extends JwtPayload {
  _id: string;
}

export default (req: MyRequest, res: Response, next: NextFunction) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret123') as MyJwtPayload;

      req.userId = decoded._id;
      next();
    } catch (e) {
      return res.status(403).json({
        message: 'No token ',
      });
    }
  } else {
    return res.status(403).json({
      message: 'No access',
    });
  }
};
