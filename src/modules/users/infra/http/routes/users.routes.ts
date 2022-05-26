import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import { bodyFieldValidation } from '../middlewares/bodyFieldValidation';
import { paramsIdValidation } from '../middlewares/paramsIdValidation';

const usersRouter = Router();

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.post('/', bodyFieldValidation, usersController.create);

usersRouter.get('/', isAuthenticated, usersController.list);

usersRouter.get(
    '/:id',
    isAuthenticated,
    paramsIdValidation,
    usersController.show
);

usersRouter.put(
    '/:id',
    isAuthenticated,
    bodyFieldValidation,
    usersController.update
);

usersRouter.delete(
    '/delete/:id',
    isAuthenticated,
    paramsIdValidation,
    usersController.delete
);

usersRouter.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    userAvatarController.update
);

export default usersRouter;
