import { Router} from 'express'
import { validateUserLogin, validateUserSignup } from '../../middlewares/validateUser';
import { UserController } from './user.controller';
import UserRepository from './user.repository';



const userRouter = (userRepo: UserRepository) => {
  const router = Router();

  const userController = new UserController(userRepo);

  router.post('/signup', validateUserSignup,  userController.userSignup)
  router.post('/login', validateUserLogin,  userController.userLogin)

  return router;
}



export default userRouter;
