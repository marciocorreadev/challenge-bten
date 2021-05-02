import { Router } from 'express';
import IndexController from '@controllers/IndexController'
import UserController from '@controllers/UserController';

const router = Router()
const indexController = new IndexController();
const userController = new UserController();

router.get('/ping', indexController.ping);

router.route('/user/:id')
    .get(userController.getUser)
    .put(userController.updateUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

router.route('/user')
    .post(userController.addUser)
    .get(userController.getUsers);

export default router;