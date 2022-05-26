import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import { Router } from 'express';
import ProfileUserController from '../controllers/ProfileUserController';

const profileRouter = Router();

const profileUserController = new ProfileUserController();

profileRouter.get('/', isAuthenticated, profileUserController.show);

profileRouter.put('/', isAuthenticated, profileUserController.update);

export default profileRouter;
