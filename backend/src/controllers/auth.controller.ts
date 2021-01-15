import { Response, Request } from 'express';

import User from '../models/user';
import { IUser } from '../types/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const signup = (req: Request, res: Response): void => {
  const body = req.body as Pick<IUser, 'username' | 'password'>;

  const user: IUser = new User({
    username: body.username,
    password: bcrypt.hashSync(body.password, 8),
  });

  user.save((error: Error, user: IUser) => {
    if (error) {
      res.status(500).send({ message: error });
      return;
    }

    res.send({ message: 'User was registered successfully!', user: user });
  });
};

export const signin = (req: Request, res: Response): void => {
  User.findOne({
    username: req.body.username,
  }).exec(
    (
      error: Error,
      user: {
        password: string;
        id: string;
        _id: string;
        username: string;
      }
    ) => {
      if (error) {
        res.status(500).send({ message: error });
        return;
      }

      if (!user) {
        res.status(404).send({ message: 'User Not found.' });
        return;
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid password!',
        });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 84600,
      });

      res.status(200).send({
        id: user._id,
        username: user.username,
        accessToken: token,
      });
    }
  );
};
