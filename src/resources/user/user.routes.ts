import { Router} from 'express'
import { validateUserSignup } from '../../middlewares/validateUser';
import { userSignup } from './user.controller';
import { dbMiddleware } from '../../middlewares/dbMiddleWare';

const router = Router();

router.post('/signup', validateUserSignup, dbMiddleware,  userSignup)

export default router;