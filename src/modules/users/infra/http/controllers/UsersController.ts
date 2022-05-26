import CreateUserService from '@modules/users/services/CreateUserService';
import ListUserService from '@modules/users/services/ListUserService';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import DeleteUserService from '../../../services/DeleteUserService';
import ShowUserService from '../../../services/ShowUserService';
import UpdateUserService from '../../../services/UpdateUserService';

class UsersController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { name, email, password } = req.body;

        const createUserService = container.resolve(CreateUserService);

        const user = await createUserService.execute({ name, email, password });

        return res.json(instanceToPlain(user));
    }

    public async list(req: Request, res: Response): Promise<Response> {
        const limit = 5;

        const listUserService = container.resolve(ListUserService);

        const users = await listUserService.execute(limit);

        return res.json(instanceToPlain(users));
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const showUserService = container.resolve(ShowUserService);

        const user = await showUserService.execute({ id });

        return res.json(instanceToPlain(user));
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const { name, email, password, avatar } = req.body;

        const updateUserService = container.resolve(UpdateUserService);

        const user = await updateUserService.execute({
            id,
            name,
            email,
            password,
            avatar,
        });

        return res.json(instanceToPlain(user));
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const deleteUserService = container.resolve(DeleteUserService);

        await deleteUserService.execute({ id });

        return res.status(200).json({ message: 'User deleted successfully!' });
    }
}

export default UsersController;
