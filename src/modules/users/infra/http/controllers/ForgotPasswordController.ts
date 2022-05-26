import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForgotEmailPwdService from '../../../services/SendForgotEmailPwdService';

class ForgotPasswordController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;

        const sendForgotEmailPwdService = container.resolve(SendForgotEmailPwdService);

        await sendForgotEmailPwdService.execute({
            email,
        });

        return res.status(204).json();
    }
}

export default ForgotPasswordController;
