/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import { checkDuplicateUsername } from '../middleware/verifySignUp';
import { signup, signin } from '../controllers/auth.controller';

module.exports = function (app: any) {
  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post('/api/auth/signup', [checkDuplicateUsername], signup);
  app.post('/api/auth/signin', signin);
};
