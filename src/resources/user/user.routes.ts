import { Router} from 'express'
import { validateUserLogin, validateUserSignup } from '../../middlewares/validateUser';
import { userLogin, userSignup } from './user.controller';
import { dbMiddleware } from '../../middlewares/dbMiddleWare';

const router = Router();

router.post('/signup', validateUserSignup, dbMiddleware,  userSignup)
router.post('/login', validateUserLogin, dbMiddleware,  userLogin)

export default router;
