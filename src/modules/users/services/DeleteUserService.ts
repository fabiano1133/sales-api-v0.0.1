import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IDeleteUser } from '../domain/models/IDeleteUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class DeleteUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    public async execute({ id }: IDeleteUser): Promise<any> {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new AppError('User not found');
        }
        await this.usersRepository.remove(user);
    }
}

export default DeleteUserService;
