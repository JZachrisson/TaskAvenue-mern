import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import { IUser } from '../types/user';

export const checkDuplicateUsername = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  User.findOne({
    username: req.body.username,
  }).exec((error: Error, user: IUser) => {
    if (error) {
      res.status(500).send({ message: error });
      return;
    }

    if (user) {
      res.status(400).send({ message: 'Failed! Username already in use!' });
    }
    next();
  });
};
