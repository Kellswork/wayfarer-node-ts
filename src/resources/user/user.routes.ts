import { Router} from 'express'
import { validateUserLogin, validateUserSignup } from '../../middlewares/validateUser';
import { userLogin, userSignup } from './user.controller';
import { dbMiddleware } from '../../middlewares/dbMiddleWare';

const router = Router();

router.post('/signup', validateUserSignup,  userSignup)
router.post('/login', validateUserLogin,  userLogin)

export default router;
