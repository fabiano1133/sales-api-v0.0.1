import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';
import { resetPasswordValidation } from '../middlewares/resetPasswordValidation';

const passwordRouter = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', forgotPasswordController.create);

passwordRouter.post(
    '/reset',
    resetPasswordValidation,
    resetPasswordController.create
);

export default passwordRouter;
