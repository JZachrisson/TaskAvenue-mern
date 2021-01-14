import { Request, Response, Router, NextFunction } from 'express';
import { checkDuplicateUsername } from '../middleware/verifySignUp';
import { signup, signin } from '../controllers/auth.controller';

const router: Router = Router();

router.use(function (req: Request, res: Response, next: NextFunction) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

router.post('/signup', [checkDuplicateUsername], signup);
router.post('/signin', signin);

export default router;
