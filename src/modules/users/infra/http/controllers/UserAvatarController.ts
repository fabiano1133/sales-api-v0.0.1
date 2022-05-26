import { Request, Response } from 'express';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';
import { instanceToPlain } from 'class-transformer';
import { container } from 'tsyringe';

class UserAvatarController {
    public async update(req: Request, res: Response): Promise<Response> {
        const updateAvatar = container.resolve(UpdateUserAvatarService);

        const user = await updateAvatar.execute({
            user_id: req.user.id,
            avatarFilename: req.file?.filename,
        });
        return res.json(instanceToPlain(user));
    }
}

export default UserAvatarController;
