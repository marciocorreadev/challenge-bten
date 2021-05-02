import { Router } from 'express';
import IndexController from '@controllers/IndexController';
import UserController from '@controllers/UserController';
import auth from '@middleware/auth';
import AuthController from './controllers/AuthController';

const router = Router();

router.get('/ping', IndexController.ping);

router.post('/auth', AuthController.login);
router.post('/user', UserController.addUser);

router.use(auth);

router.route('/user/:id')
  .get(UserController.getUser)
  .put(UserController.updateUser)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);

router.route('/user').get(UserController.getUsers);

export default router;