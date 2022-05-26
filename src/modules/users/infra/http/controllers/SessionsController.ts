import { Request, Response } from 'express';
import CreateSessionService from '../../../services/CreateSessionService';
import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';

class SessionsController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        const createSessionService = container.resolve(CreateSessionService);

        const user = await createSessionService.execute({
            email,
            password,
        });

        return res.json(instanceToInstance(user));
    }
}

export default SessionsController;
