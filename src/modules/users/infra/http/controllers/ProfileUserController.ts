import { Request, Response } from 'express';
import ShowUserProfileService from '../../../services/ShowUserProfileService';
import UpdateShowUserService from '../../../services/UpdateShowUserService';
import { instanceToPlain } from 'class-transformer';
import { container } from 'tsyringe';

class ProfileUserController {
    public async show(req: Request, res: Response): Promise<Response> {
        const user_id = req.user.id;

        const showUserProfileService = container.resolve(ShowUserProfileService);

        const user = await showUserProfileService.execute({
            user_id,
        });
        return res.json(instanceToPlain(user));
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const user_id = req.user.id;
        const { name, email, password, old_password } = req.body;

        const updateUserProfileService = container.resolve(UpdateShowUserService);

        const user = await updateUserProfileService.execute({
            user_id,
            name,
            email,
            password,
            old_password,
        });

        return res.json(user);
    }
}

export default ProfileUserController;
